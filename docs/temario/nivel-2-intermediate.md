# Nivel 2. Intermediate

**Para quién:** QA Jr que ya escribe pruebas básicas con Playwright.
**Meta:** diseñar, mantener y depurar pruebas de forma independiente, con código organizado y reutilizable.
**Horas guiadas:** 200 h en dos bloques (~34 semanas a 6 h/semana).
**Rol al terminar:** QA Mid en automatización.

Es el nivel más largo del framework (160–240 h de automatización más 120–160 h de API),
por eso se divide en dos bloques que se pueden tomar por separado.

## Bloque 2A. Código de pruebas mantenible (100 h)

| # | Módulo | Temas | En vivo | Lab | Horas |
|---|---|---|---|---|---|
| M2.1 | OOP aplicada a pruebas | Clases, encapsulamiento, herencia vs composición, modificadores de acceso, `readonly` | Por qué las pruebas también necesitan diseño | Refactorizar una suite repetitiva | 12 h |
| M2.2 | Page Object Model | Page Objects, componentes reutilizables (header, modal), qué va en el PO y qué en la prueba | Construir un PO en vivo | Pasar la suite de humo del Nivel 1 a POM | 18 h |
| M2.3 | Fixtures | `test.extend`, fixtures que entregan Page Objects, setup y teardown | Fixtures vs `beforeEach` | Crear fixtures para las páginas principales | 10 h |
| M2.4 | Locators avanzados y estrategia | Locators en tablas y listas, `filter({ has })`, `nth`, shadow DOM, acordar `data-testid` con desarrollo | Cómo pedir testabilidad al equipo dev | Automatizar una tabla dinámica | 10 h |
| M2.5 | Sincronización y casos difíciles | Diálogos (`page.on('dialog')`), popups y nuevas pestañas, iframes, descargas y cargas de archivos, esperar respuestas de red | Demo de cada caso | Lab con `the-internet.herokuapp.com` | 14 h |
| M2.6 | Excepciones y depuración | `try/catch`, errores propios, Trace Viewer, `--debug`, leer stack traces, clasificar fallas | Depurar una falla real paso a paso | Resolver 5 fallas con solo el trace | 14 h |
| M2.7 | Colecciones y datos | Arreglos de objetos, `Map`, `Set`, leer JSON y CSV, generar datos (p. ej. faker) | Datos de prueba sin duplicar código | Preparar datos para el bloque 2B | 8 h |
| M2.8 | Leer y refactorizar código ajeno | Code smells en pruebas, nombres, duplicación, revisión de PR | Revisar un PR en vivo | Revisar y mejorar el PR de un compañero | 8 h |
| M2.9 | Git en equipo | Ramas, `switch`, `merge`, conflictos simples, PR con revisión | Provocar y resolver un conflicto | Resolver conflictos en una rama compartida | 6 h |

**Proyecto 2A:** framework POM con fixtures para una app de práctica, con al menos 20
pruebas de UI, sin duplicación y revisado por un compañero.

## Bloque 2B. API y pruebas guiadas por datos (100 h)

| # | Módulo | Temas | En vivo | Lab | Horas |
|---|---|---|---|---|---|
| M2.10 | REST a fondo | Idempotencia, métodos seguros, headers comunes, autenticación (token, cookie), paginación | Qué validar más allá del status | Documentar y probar una API con auth | 12 h |
| M2.11 | `APIRequestContext` | `request.newContext`, `baseURL`, headers por defecto, aserciones en body, headers y status | Demo con `restful-booker` | Suite CRUD completa | 16 h |
| M2.12 | Utilidades de API reutilizables | Clientes de API por recurso, tipado de respuestas con interfaces, helpers | Diseñar un cliente de API | Construir clientes para 2 recursos | 14 h |
| M2.13 | Pruebas data-driven | Parametrizar con arreglos y archivos, generar pruebas en ciclo, nombres de prueba dinámicos | Data-driven vs keyword-driven | Pruebas de valores límite y particiones con datos | 14 h |
| M2.14 | UI + API juntos | Crear datos por API y validar por UI, limpiar datos al terminar, interceptar respuestas | Por qué es más rápido y estable | Reescribir pruebas lentas de UI con setup por API | 14 h |
| M2.15 | Diseño de pruebas aplicado | Valores límite, particiones de equivalencia, tablas de decisión, transición de estados, criterios de aceptación, riesgo básico | De la historia de usuario a la lista de pruebas | Diseñar y automatizar las pruebas de una historia | 18 h |
| M2.16 | Severidad, prioridad y cobertura | Diferencia severidad/prioridad, cómo saber si la cobertura alcanza, qué no automatizar | Casos reales | Matriz de cobertura de una funcionalidad | 12 h |

**Proyecto 2B:** agregar al framework de 2A una capa de API con clientes tipados, pruebas
data-driven y al menos 5 pruebas que combinen API y UI.

## Criterios de salida

La persona puede, de forma independiente:

- Construir y mantener un framework POM con fixtures.
- Depurar una falla con el Trace Viewer y explicar la causa.
- Automatizar casos difíciles: diálogos, pestañas, iframes y archivos.
- Escribir pruebas de API reutilizables y guiadas por datos.
- Diseñar pruebas con técnicas formales a partir de criterios de aceptación.
- Trabajar en una rama compartida y resolver conflictos simples.
- Responder las preguntas B de las cuatro áreas como "Competent".
