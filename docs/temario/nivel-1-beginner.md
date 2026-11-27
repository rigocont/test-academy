# Nivel 1. Beginner

**Para quién:** QA que ya programa lo básico (Nivel 0 o equivalente) y quiere escribir sus primeras pruebas automatizadas.
**Meta:** escribir, ejecutar y entender pruebas de UI y API con Playwright, con guía.
**Horas guiadas:** 90 h (~15 semanas a 6 h/semana).
**Rol al terminar:** QA Jr en automatización.

## Módulos

| # | Módulo | Temas | En vivo | Lab | Horas |
|---|---|---|---|---|---|
| M1.1 | Primer proyecto Playwright | `npm init playwright`, estructura del proyecto, `playwright.config.ts` básico, navegadores | Crear un proyecto desde cero | Correr las pruebas de ejemplo en los 3 navegadores | 6 h |
| M1.2 | Anatomía de una prueba | `test()`, `page`, `goto`, acciones (`click`, `fill`, `check`, `selectOption`), estructura Arrange-Act-Assert | De caso de prueba manual a spec | Automatizar 3 casos de prueba escritos en el Nivel 0 | 10 h |
| M1.3 | Locators | `getByRole`, `getByText`, `getByLabel`, `getByTestId`, CSS, XPath, por qué preferir locators de usuario, encadenar y filtrar | Comparar locators frágiles vs robustos | Reescribir pruebas con locators frágiles | 14 h |
| M1.4 | Aserciones | `expect`, web-first assertions (`toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveCount`), aserciones genéricas vs de página, soft assertions | Qué hace una buena aserción | Agregar aserciones a pruebas que "pasan sin probar nada" | 10 h |
| M1.5 | Esperas | Auto-waiting, por qué no usar `waitForTimeout`, esperar navegación, respuestas y estados | Demo de una prueba inestable y su arreglo | Corregir 5 pruebas flaky | 10 h |
| M1.6 | Ejecutar y leer resultados | CLI (`--headed`, `--project`, `-g`), UI mode, reporte HTML, screenshots y videos al fallar | Leer un reporte de falla | Diagnosticar fallas a partir del reporte | 8 h |
| M1.7 | Codegen y depuración básica | `npx playwright codegen`, Inspector, `--debug`, cuándo sirve codegen y cuándo no | Grabar y luego limpiar una prueba | Convertir código grabado en una prueba legible | 8 h |
| M1.8 | Organizar pruebas | `test.describe`, `beforeEach`/`afterEach`, nombres claros, un archivo por funcionalidad | Convenciones de la academia | Reorganizar una suite desordenada | 8 h |
| M1.9 | Primeras pruebas de API | Fixture `request`, `get`/`post`, `toBeOK()`, validar status y campos del JSON | De la exploración del Nivel 0 a código | Automatizar los 5 endpoints documentados en M0.9 | 12 h |
| M1.10 | Git en el flujo de pruebas | `.gitignore` para Playwright, commits pequeños, ramas por lab | Cómo se ve un buen PR de pruebas | Todo el nivel se entrega por PR | 4 h |

## Proyecto final

**"Suite de humo":** 10 pruebas de UI y 5 de API sobre la tienda de práctica del repo:
login, búsqueda, agregar al carrito, checkout y validaciones de API. Requisitos: sin
`waitForTimeout`, locators de usuario, pasa 5 veces seguidas, reporte HTML adjunto al PR.
Detalle en [niveles/nivel-1](../../niveles/nivel-1/README.md#proyecto-final-suite-de-humo).

## Criterios de salida

La persona puede, con guía mínima:

- Convertir un caso de prueba manual en una prueba de Playwright legible.
- Elegir un locator robusto y explicar por qué.
- Explicar el auto-waiting y corregir una prueba inestable por esperas.
- Leer un reporte de falla y decir si es bug de la app o de la prueba.
- Escribir una prueba de API que valide status y contenido.
- Responder las preguntas A de Automatización y API como "Competent".
