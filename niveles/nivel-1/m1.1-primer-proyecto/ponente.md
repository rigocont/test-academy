# Notas del ponente: M1.1 Primer proyecto con Playwright

## Antes de la clase

- Ten una carpeta vacía para correr `npm init playwright@latest` en vivo (tarda 1 o 2 minutos en descargar navegadores: arráncalo al inicio).
- Abre `playwright.config.ts` de este repo para el recorrido.
- Si la red es corporativa, prueba antes que `npx playwright install` funcione con el proxy.

## Guion de la sesión

1. **Qué es Playwright (15 min).** Tres ideas: espera sola a que la página esté lista (auto-waiting), corre en Chromium, Firefox y WebKit, y prueba UI y API con la misma herramienta.
2. **Demo `npm init playwright@latest` (30 min).** Contesta las preguntas en voz alta (TypeScript, carpeta `tests`, GitHub Actions: no por ahora). Corre las pruebas de ejemplo en los 3 navegadores.
3. **Recorrido por la configuración (25 min).** En el `playwright.config.ts` de este repo señala `baseURL`, `projects`, `webServer`, `trace` y `screenshot`. Pregunta qué pasaría si quitas `webServer` y la tienda no está corriendo.
4. **Formas de correr (20 min).** Terminal, `--headed` y `--ui`. Dedica la mayor parte a `--ui`: elegir una prueba, ver cada paso y la línea de tiempo.

## Errores comunes

- Correr `npm init playwright` dentro de este repo y sobrescribir su configuración. Debe ser en una carpeta aparte.
- El puerto 3000 ocupado por otra app: el `webServer` no arranca.
- Firefox o WebKit sin instalar: `npx playwright install` sin argumentos los descarga todos.

## Respuestas de referencia

1. Escribir rutas relativas (`page.goto('/')`) y cambiar de ambiente modificando un solo valor.
2. Headless corre sin ventana (más rápido, es lo que usa el CI); `--headed` muestra el navegador para ver qué pasa.
3. Levanta la aplicación antes de las pruebas y espera a que responda en la URL indicada.

## Cierre

El lab tiene un solo `TODO`. Lo importante es que corran en los 3 navegadores y lean las dos pruebas ya hechas.
