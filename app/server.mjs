// Tienda de práctica de la academia.
// Servidor sin dependencias: sirve las páginas de app/public y una API REST en memoria.
// Uso: node app/server.mjs   (puerto 3000 por defecto, o PUERTO=4000)

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { atenderPedidos } from './pedidos.mjs';

const PUERTO = Number(process.env.PUERTO ?? 3000);
const CARPETA_PUBLICA = join(fileURLToPath(new URL('.', import.meta.url)), 'public');

const PRODUCTOS = [
  { id: 1, nombre: 'Mochila de viaje', precio: 899, categoria: 'accesorios' },
  { id: 2, nombre: 'Lámpara de escritorio', precio: 459, categoria: 'hogar' },
  { id: 3, nombre: 'Audífonos inalámbricos', precio: 1299, categoria: 'electronica' },
  { id: 4, nombre: 'Taza térmica', precio: 249, categoria: 'hogar' },
  { id: 5, nombre: 'Teclado mecánico', precio: 1599, categoria: 'electronica' },
  { id: 6, nombre: 'Cuaderno de notas', precio: 99, categoria: 'papeleria' },
];

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Ana López', correo: 'ana@ejemplo.com', rol: 'admin' },
  { id: 2, nombre: 'Luis Pérez', correo: 'luis@ejemplo.com', rol: 'qa' },
];

let usuarios = structuredClone(USUARIOS_INICIALES);
let siguienteId = 3;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.csv': 'text/csv; charset=utf-8',
};

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

function json(res, status, cuerpo) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(cuerpo === undefined ? '' : JSON.stringify(cuerpo));
}

async function leerCuerpo(req) {
  let datos = '';
  for await (const parte of req) datos += parte;
  if (!datos) return {};
  try {
    return JSON.parse(datos);
  } catch {
    return null;
  }
}

function validarUsuario(datos) {
  if (!datos || typeof datos !== 'object') return 'El cuerpo debe ser JSON válido';
  if (!datos.nombre || typeof datos.nombre !== 'string') return 'El nombre es obligatorio';
  if (!datos.correo || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(datos.correo)) return 'El correo no es válido';
  return null;
}

async function api(req, res, url) {
  const partes = url.pathname.split('/').filter(Boolean); // ['api', 'productos', '3']
  const recurso = partes[1];
  const id = partes[2] ? Number(partes[2]) : undefined;

  if (recurso === 'productos' && req.method === 'GET') {
    // Retraso a propósito para practicar esperas (se puede cambiar con ?retraso=ms).
    await esperar(Number(url.searchParams.get('retraso') ?? 600));
    if (id === undefined) {
      const categoria = url.searchParams.get('categoria');
      return json(res, 200, categoria ? PRODUCTOS.filter((p) => p.categoria === categoria) : PRODUCTOS);
    }
    const producto = PRODUCTOS.find((p) => p.id === id);
    return producto ? json(res, 200, producto) : json(res, 404, { error: 'Producto no encontrado' });
  }

  if (recurso === 'usuarios') {
    if (req.method === 'GET' && id === undefined) return json(res, 200, usuarios);
    if (req.method === 'GET') {
      const usuario = usuarios.find((u) => u.id === id);
      return usuario ? json(res, 200, usuario) : json(res, 404, { error: 'Usuario no encontrado' });
    }
    if (req.method === 'POST' && id === undefined) {
      const datos = await leerCuerpo(req);
      const error = validarUsuario(datos);
      if (error) return json(res, 400, { error });
      const nuevo = { id: siguienteId++, nombre: datos.nombre, correo: datos.correo, rol: datos.rol ?? 'qa' };
      usuarios.push(nuevo);
      return json(res, 201, nuevo);
    }
    if (req.method === 'DELETE' && id !== undefined) {
      const antes = usuarios.length;
      usuarios = usuarios.filter((u) => u.id !== id);
      return usuarios.length < antes ? json(res, 204) : json(res, 404, { error: 'Usuario no encontrado' });
    }
  }

  if (await atenderPedidos(req, res, url, { json, leerCuerpo, productos: PRODUCTOS })) return;

  if (recurso === 'reiniciar' && req.method === 'POST') {
    usuarios = structuredClone(USUARIOS_INICIALES);
    siguienteId = 3;
    return json(res, 204);
  }

  return json(res, 404, { error: 'Ruta no encontrada' });
}

async function archivo(res, ruta) {
  const relativa = ruta === '/' ? 'index.html' : ruta.slice(1);
  const completa = normalize(join(CARPETA_PUBLICA, relativa));
  if (!completa.startsWith(CARPETA_PUBLICA)) return json(res, 403, { error: 'Prohibido' });
  try {
    const contenido = await readFile(completa);
    res.writeHead(200, { 'Content-Type': TIPOS[extname(completa)] ?? 'application/octet-stream' });
    res.end(contenido);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Página no encontrada</h1>');
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PUERTO}`);
  try {
    if (url.pathname === '/salud') return json(res, 200, { estado: 'ok' });
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    return await archivo(res, url.pathname);
  } catch (e) {
    console.error(e);
    return json(res, 500, { error: 'Error interno' });
  }
}).listen(PUERTO, () => {
  console.log(`Tienda de práctica en http://localhost:${PUERTO}`);
});
