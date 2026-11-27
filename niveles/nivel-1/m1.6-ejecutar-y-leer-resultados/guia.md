# M1.6 Ejecutar y leer resultados (8 h)

## Objetivo

Correr pruebas con las opciones correctas y diagnosticar una falla a partir del reporte, el screenshot y el trace.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Opciones de la línea de comandos |
| 25 min | El reporte HTML: qué trae cada prueba |
| 30 min | Demo: tres fallas distintas y cómo saber si es bug de la app o de la prueba |
| 15 min | Cómo reportar un bug encontrado por una prueba automatizada |

## Conceptos clave

```bash
npx playwright test -g "carrito"         # solo pruebas cuyo nombre contiene "carrito"
npx playwright test --project=nivel-1    # un proyecto
npx playwright test --headed --workers=1 # viendo el navegador, una a la vez
npx playwright test --last-failed        # solo las que fallaron la vez pasada
npm run reporte                          # abre el reporte HTML
npx playwright show-trace <ruta/trace.zip>
```

En este repo, cuando una prueba falla se guardan un **screenshot** y un **trace**
(`playwright.config.ts`: `screenshot: 'only-on-failure'`, `trace: 'retain-on-failure'`).

| Lo que dice el error | Suele ser |
|---|---|
| `Timeout ... waiting for getByRole(...)` | El locator no encuentra el elemento: cambió el texto, no se cargó o el locator está mal |
| `Expected: "2"  Received: "1"` | La app hizo algo distinto a lo esperado: posible bug, o la prueba asumió mal |
| `strict mode violation: ... resolved to 2 elements` | El locator encontró más de un elemento: hay que hacerlo más específico |

## Actividad guiada (4 h)

1. Copia la solución de M1.2 en una rama y rompe la app a propósito de 3 formas, una a la vez:
   - En `app/public/index.html` cambia el texto del botón "Entrar" por "Ingresar".
   - Cambia el mensaje "Este usuario está bloqueado".
   - En `app/server.mjs` cambia el precio de la Taza térmica.
2. Corre las pruebas, abre el reporte y para cada falla escribe en tu PR:
   qué prueba falló, qué dice el error, qué muestra el screenshot y el trace, y si es bug de la app o de la prueba.
3. Escribe un reporte de bug para la falla del precio como si fuera real.

## Preguntas de repaso

1. ¿Qué información trae el trace que no trae el screenshot?
2. ¿Qué significa "strict mode violation"?
3. ¿Qué debe incluir un reporte de bug encontrado por una prueba automatizada?

## Para el instructor

- Revierte los cambios a la app al terminar la sesión. Pide que lo hagan en una rama aparte.
