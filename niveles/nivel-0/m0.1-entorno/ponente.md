# Notas del ponente: M0.1 Entorno de trabajo

## Antes de la clase

- Manda 2 días antes los links de descarga de Node.js LTS, Git y VS Code, y pide que los instalen si pueden.
- Ten el repo clonado y la tienda corriendo (`npm run app`) para mostrarla al inicio.
- Prepara una máquina limpia o una cuenta nueva para instalar en vivo.

## Guion de la sesión

1. **Qué vamos a construir (15 min).** Abre la tienda de práctica y corre `npm run verificar-soluciones -- --project=nivel-1 --headed` para que vean el navegador moviéndose solo. Explica la ruta de 5 niveles y que todo se entrega como pull request.
2. **Instalación guiada (30 min).** Instala en vivo Node.js, Git y VS Code. Después de cada uno, todos corren `node --version`, `git --version` y abren VS Code. No avances hasta que la mayoría tenga los tres.
3. **La terminal (30 min).** Practiquen juntos `pwd`, `ls`, `cd` y `cd ..` hasta llegar a `niveles/nivel-0`. Pide que alguien comparta pantalla y navegue mientras los demás le dictan.
4. **Clonar y correr (15 min).** `git clone`, `npm install`, `npx playwright install chromium`, `npm run test:nivel0`. Aclara que es normal ver casi todo en rojo.

## Errores comunes

- Node.js viejo (16 o 18): `npm install` falla o Playwright no arranca. Solución: instalar la LTS actual.
- En Windows, comandos que fallan por rutas con espacios. Usa la terminal integrada de VS Code.
- Correr `npm install` fuera de la carpeta del repo: no encuentra `package.json`.
- Proxy corporativo que bloquea la descarga de Chromium: ten a mano la variable `HTTPS_PROXY` de su red.

## Respuestas de referencia

1. `npm` instala paquetes y corre scripts de `package.json`; `npx` ejecuta una herramienta del proyecto sin instalarla globalmente.
2. TypeScript marca errores (tipos, nombres mal escritos) antes de correr la prueba y el editor autocompleta.
3. Lee las dependencias de `package.json` y las descarga en `node_modules`.

## Cierre

Recuerda el criterio de "listo": pruebas que corren (aunque fallen), la tienda abierta y `hola.ts` funcionando. Quien no termine la instalación agenda 15 minutos contigo antes de M0.2.
