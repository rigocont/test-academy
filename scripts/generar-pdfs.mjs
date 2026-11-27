// Genera el material de exposición en PDF para cada clase, a partir de:
//   niveles/<nivel>/<modulo>/guia.md     → diapositivas para proyectar
//   niveles/<nivel>/<modulo>/ponente.md  → notas para quien imparte la clase (al final del PDF)
// y la presentación ejecutiva de la academia (docs/presentacion-ejecutiva.html).
//
// Uso:
//   npm run pdfs                 # todo
//   npm run pdfs -- m1.3 m2.10   # solo los módulos que contienen esos textos
//   npm run pdfs -- ejecutivo    # solo la presentación ejecutiva
//
// Los PDF se escriben en material-ponente/. Requiere el Chromium de Playwright
// (npx playwright install chromium).

import { readFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { marked } from 'marked';

const raiz = resolve(import.meta.dirname, '..');
const salida = join(raiz, 'material-ponente');
const filtros = process.argv.slice(2);

const NIVELES = {
  'nivel-0': { nombre: 'Nivel 0 · Bases', color: '#0f766e' },
  'nivel-1': { nombre: 'Nivel 1 · Beginner', color: '#1d4ed8' },
  'nivel-2': { nombre: 'Nivel 2 · Intermediate', color: '#7c3aed' },
  'nivel-3': { nombre: 'Nivel 3 · Advanced', color: '#c2410c' },
  'nivel-4': { nombre: 'Nivel 4 · Expert', color: '#be123c' },
};

const escapar = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const enLinea = (t) => marked.parseInline(t ?? '');
const html = (tokens) => marked.parser(tokens);

// ---------------------------------------------------------------- lectura de la guía

function secciones(markdown) {
  const tokens = marked.lexer(markdown);
  const titulo = tokens.find((t) => t.type === 'heading' && t.depth === 1)?.text ?? 'Clase';
  const lista = [];
  let actual = null;
  for (const t of tokens) {
    if (t.type === 'heading' && t.depth === 1) continue;
    if (t.type === 'heading' && t.depth === 2) {
      actual = { titulo: t.text, tokens: [] };
      lista.push(actual);
    } else if (actual && t.type !== 'space') {
      actual.tokens.push(t);
    }
  }
  return { titulo, secciones: lista };
}

/** Peso aproximado de un bloque en "líneas" de diapositiva. */
function peso(t) {
  if (t.type === 'code') return t.text.split('\n').length + 1.5;
  if (t.type === 'table') return t.rows.length * 1.3 + 2;
  if (t.type === 'list') return t.items.reduce((s, i) => s + Math.ceil(i.text.length / 95), 0) + 0.5;
  if (t.type === 'heading') return 1.5;
  return Math.ceil((t.text ?? t.raw ?? '').length / 95) + 0.5;
}

/** Corta una sección en diapositivas que caben en pantalla. */
function trocear(tokens, maximo = 15) {
  const expandidos = [];
  for (const t of tokens) {
    // Un bloque de código muy largo se parte en varias diapositivas.
    if (t.type === 'code' && t.text.split('\n').length > 20) {
      const lineas = t.text.split('\n');
      for (let i = 0; i < lineas.length; i += 18) {
        expandidos.push({ ...t, text: lineas.slice(i, i + 18).join('\n'), raw: '' });
      }
    } else if (t.type === 'list' && t.items.length > 6) {
      for (let i = 0; i < t.items.length; i += 5) {
        expandidos.push({ ...t, items: t.items.slice(i, i + 5), start: (t.start || 1) + i });
      }
    } else {
      expandidos.push(t);
    }
  }
  const grupos = [];
  let grupo = [];
  let suma = 0;
  for (const t of expandidos) {
    const p = peso(t);
    const esBloqueGrande = t.type === 'code' || t.type === 'table';
    if (grupo.length && (suma + p > maximo || (esBloqueGrande && suma > 5))) {
      grupos.push(grupo);
      grupo = [];
      suma = 0;
    }
    // Un párrafo corto que presenta al bloque siguiente se queda con él.
    grupo.push(t);
    suma += p;
  }
  if (grupo.length) grupos.push(grupo);
  // Si un grupo termina en una viñeta que presenta al siguiente bloque ("Ejemplo:"), pásala al grupo siguiente.
  for (let i = 0; i < grupos.length - 1; i++) {
    const ultimo = grupos[i].at(-1);
    const item = ultimo.type === 'list' ? ultimo.items.at(-1) : null;
    if (item && /:\s*\**\s*$/.test(item.text)) {
      const intro = marked.lexer(item.text)[0];
      if (ultimo.items.length === 1) grupos[i].pop();
      else grupos[i][grupos[i].length - 1] = { ...ultimo, items: ultimo.items.slice(0, -1) };
      grupos[i + 1].unshift(intro);
    }
  }
  // Si un grupo termina en un párrafo corto que presenta al siguiente bloque, muévelo.
  for (let i = 0; i < grupos.length - 1; i++) {
    const ultimo = grupos[i].at(-1);
    if (grupos[i].length > 1 && ultimo.type === 'paragraph' && /:\s*\**\s*$/.test(ultimo.text)) {
      grupos[i + 1].unshift(grupos[i].pop());
    }
  }
  return grupos;
}

// Formato fijo de los talleres del Nivel 4 (ver niveles/nivel-4/README.md).
const AGENDA_TALLER = [
  { tiempo: '30 min', tema: 'Exposición: el problema y 2 o 3 marcos para pensarlo' },
  { tiempo: '60 min', tema: 'Caso en grupo sobre una situación real de un participante' },
  { tiempo: '45 min', tema: 'Presentación y crítica entre pares' },
  { tiempo: '45 min', tema: 'Arranque del entregable individual' },
];

function listaAgenda(filas) {
  return `<ol class="agenda">${filas
    .map((f) => `<li><span class="minutos">${escapar(f.tiempo)}</span><span class="tema">${enLinea(f.tema)}</span></li>`)
    .join('')}</ol>`;
}

function tablaAgenda(seccion) {
  const tabla = seccion.tokens.find((t) => t.type === 'table' && /tiempo/i.test(t.header[0]?.text ?? ''));
  if (!tabla) return '';
  return listaAgenda(tabla.rows.map((r) => ({ tiempo: r[0].text, tema: r[1]?.text ?? '' })));
}

// ---------------------------------------------------------------- armado de las diapositivas

function diapositiva({ clase = '', etiqueta = '', titulo = '', cuerpo = '' }) {
  return `<section class="slide ${clase}">
    <header>${etiqueta ? `<span class="etiqueta">${escapar(etiqueta)}</span>` : ''}<h2>${enLinea(titulo)}</h2></header>
    <div class="contenido">${cuerpo}</div>
    <footer><span class="pie-modulo"></span><span class="numero"></span></footer>
  </section>`;
}

function construirClase(rutaGuia, nivel) {
  const guia = secciones(readFileSync(rutaGuia, 'utf8'));
  const rutaPonente = join(rutaGuia, '..', 'ponente.md');
  const ponente = existsSync(rutaPonente) ? readFileSync(rutaPonente, 'utf8') : '';
  const [codigo, ...resto] = guia.titulo.split(' ');
  const horas = guia.titulo.match(/\(([^)]+)\)\s*$/)?.[1] ?? '';
  const nombre = resto.join(' ').replace(/\s*\([^)]*\)\s*$/, '');

  const partes = [];
  partes.push(`<section class="slide portada">
    <div class="portada-nivel">${escapar(NIVELES[nivel].nombre)}</div>
    <div class="portada-codigo">${escapar(codigo)}</div>
    <h1>${escapar(nombre)}</h1>
    ${horas ? `<div class="portada-horas">${escapar(horas)} en total</div>` : ''}
    <div class="portada-pie">Academia de Automatización de Pruebas · Material de exposición</div>
  </section>`);

  const esTaller = nivel === 'nivel-4';
  const notasInstructor = [];
  const contenidoSlides = [];
  for (const s of guia.secciones) {
    const t = s.titulo.toLowerCase();
    if (t.startsWith('para el instructor')) {
      notasInstructor.push(html(s.tokens));
      continue;
    }
    if (t.startsWith('objetivo')) {
      contenidoSlides.push(diapositiva({ clase: 'objetivo', etiqueta: esTaller ? 'Objetivo del taller' : 'Objetivo de la clase', titulo: nombre, cuerpo: `<div class="frase">${html(s.tokens)}</div>` }));
      if (esTaller) contenidoSlides.push(diapositiva({ etiqueta: 'Agenda · 3 h', titulo: 'Cómo trabajaremos hoy', cuerpo: listaAgenda(AGENDA_TALLER) }));
      continue;
    }
    if (t.startsWith('sesión en vivo') || t.startsWith('exposición')) {
      const duracion = s.titulo.match(/\(([^)]+)\)/)?.[1] ?? '';
      const agenda = tablaAgenda(s);
      if (agenda) {
        contenidoSlides.push(diapositiva({ etiqueta: `Agenda · ${duracion}`, titulo: 'Lo que veremos hoy', cuerpo: agenda }));
        const resto = s.tokens.filter((x) => !(x.type === 'table' && /tiempo/i.test(x.header[0]?.text ?? '')));
        if (resto.length) trocear(resto).forEach((g) => contenidoSlides.push(diapositiva({ etiqueta: s.titulo, titulo: 'Sesión en vivo', cuerpo: html(g) })));
        continue;
      }
    }
    if (t.startsWith('preguntas de repaso')) {
      contenidoSlides.push(diapositiva({ clase: 'preguntas', etiqueta: s.titulo.replace(/^Preguntas de repaso\s*/i, '').replace(/[()]/g, '') || 'Para cerrar', titulo: 'Preguntas de repaso', cuerpo: html(s.tokens) }));
      continue;
    }
    if (t.startsWith('plantilla del entregable')) {
      // En los talleres del Nivel 4 la plantilla completa va en las notas; en pantalla solo se presenta.
      const codigoPlantilla = s.tokens.find((x) => x.type === 'code');
      const secc = codigoPlantilla ? [...codigoPlantilla.text.matchAll(/^## (.+)$/gm)].map((m) => m[1]) : [];
      const otros = s.tokens.filter((x) => x.type !== 'code');
      contenidoSlides.push(diapositiva({
        etiqueta: 'Entregable',
        titulo: s.titulo.replace(/^Plantilla del entregable:\s*/i, '').replace(/^./, (c) => c.toUpperCase()),
        cuerpo: `<p>La plantilla completa está en la guía del taller y al final de este PDF. Secciones:</p><ul class="columnas">${secc.map((x) => `<li>${escapar(x)}</li>`).join('')}</ul>${html(otros)}`,
      }));
      if (codigoPlantilla) notasInstructor.push(`<h3>Plantilla del entregable</h3><pre><code>${escapar(codigoPlantilla.text)}</code></pre>`);
      continue;
    }
    if (t.startsWith('exposición')) {
      trocear(s.tokens).forEach((g, i, todos) => contenidoSlides.push(diapositiva({ etiqueta: todos.length > 1 ? `Exposición · ${i + 1}/${todos.length}` : 'Exposición', titulo: nombre, cuerpo: html(g) })));
      continue;
    }
    const etiqueta = t.startsWith('lab') || t.startsWith('actividad') || t.startsWith('caso') ? 'Práctica' : t.startsWith('proyecto') ? 'Proyecto' : 'Conceptos';
    const titulo = t.startsWith('conceptos clave') ? nombre : s.titulo;
    const grupos = trocear(s.tokens);
    grupos.forEach((g, i) =>
      contenidoSlides.push(diapositiva({
        clase: etiqueta === 'Práctica' ? 'practica' : '',
        etiqueta: grupos.length > 1 ? `${etiqueta} · ${i + 1}/${grupos.length}` : etiqueta,
        titulo,
        cuerpo: html(g),
      })),
    );
  }
  partes.push(...contenidoSlides);
  partes.push(`<section class="slide cierre"><h1>¿Dudas?</h1><p>${esTaller ? 'Material del taller' : 'Lab'} en el repo: <code>${escapar(rutaGuia.replace(raiz + '/', '').replace(/guia\.md$/, ''))}</code></p></section>`);

  const notas = `<section class="notas">
    <div class="notas-titulo"><span class="etiqueta">Solo para el ponente</span><h1>Notas para impartir ${escapar(codigo)}</h1><p>${escapar(nombre)} · ${escapar(NIVELES[nivel].nombre)}</p></div>
    ${ponente ? marked.parse(ponente.replace(/^# .*\n/, '')) : '<p><em>Este módulo todavía no tiene notas del ponente (ponente.md).</em></p>'}
    ${notasInstructor.length ? `<h2>Notas de la guía</h2>${notasInstructor.join('')}` : ''}
  </section>`;

  return {
    archivo: join(salida, nivel, `${basename(join(rutaGuia, '..'))}.pdf`),
    pie: `${codigo} · ${nombre}`,
    color: NIVELES[nivel].color,
    cuerpo: partes.join('\n') + notas,
  };
}

// ---------------------------------------------------------------- render

const ESTILOS = readFileSync(join(raiz, 'scripts', 'estilos-pdf.css'), 'utf8');

function documento({ cuerpo, pie, color }) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
  <style>:root{--acento:${color}}${ESTILOS}</style></head>
  <body data-pie="${escapar(pie)}">${cuerpo}</body></html>`;
}

/** En el navegador: numera, pone el pie y achica el texto de las diapositivas que no caben. */
function ajustarDiapositivas() {
  const slides = [...document.querySelectorAll('.slide')];
  slides.forEach((s, i) => {
    const pie = s.querySelector('.pie-modulo');
    if (pie) pie.textContent = document.body.dataset.pie;
    const numero = s.querySelector('.numero');
    if (numero) numero.textContent = `${i + 1}`;
    const contenido = s.querySelector('.contenido');
    if (!contenido) return;
    let escala = 1;
    while (contenido.scrollHeight > contenido.clientHeight + 1 && escala > 0.55) {
      escala -= 0.04;
      contenido.style.fontSize = `${escala}em`;
    }
  });
}

async function imprimir(navegador, { archivo, contenido, url }) {
  const pagina = await navegador.newPage({ viewport: { width: 1280, height: 720 } });
  if (url) await pagina.goto(url);
  else await pagina.setContent(contenido, { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.evaluate(ajustarDiapositivas);
  mkdirSync(join(archivo, '..'), { recursive: true });
  await pagina.pdf({ path: archivo, width: '1280px', height: '720px', printBackground: true, preferCSSPageSize: true });
  await pagina.close();
}

const navegador = await chromium.launch();
let generados = 0;

const soloEjecutivo = filtros.length === 1 && filtros[0] === 'ejecutivo';
if (!soloEjecutivo) {
  for (const nivel of Object.keys(NIVELES)) {
    const dirNivel = join(raiz, 'niveles', nivel);
    for (const modulo of readdirSync(dirNivel).sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))) {
      const rutaGuia = join(dirNivel, modulo, 'guia.md');
      if (!statSync(join(dirNivel, modulo)).isDirectory() || !existsSync(rutaGuia)) continue;
      if (filtros.length && !filtros.some((f) => modulo.includes(f))) continue;
      const clase = construirClase(rutaGuia, nivel);
      await imprimir(navegador, { archivo: clase.archivo, contenido: documento(clase) });
      generados++;
      console.log(`✓ ${clase.archivo.replace(raiz + '/', '')}`);
    }
  }
}

if (!filtros.length || filtros.includes('ejecutivo')) {
  const archivo = join(salida, 'academia-presentacion-ejecutiva.pdf');
  await imprimir(navegador, { archivo, url: pathToFileURL(join(raiz, 'docs', 'presentacion-ejecutiva.html')).href });
  generados++;
  console.log(`✓ ${archivo.replace(raiz + '/', '')}`);
}

await navegador.close();
console.log(`\n${generados} PDF generados en material-ponente/`);
