# Notas del ponente: M1.3 Locators

## Antes de la clase

- Corre `npx playwright test m1.3 --ui` y ten listo el botón para elegir elementos (*pick locator*).
- Haz una copia de `app/server.mjs` para la demo de cambiar el orden de los productos y revertirla al terminar.

## Guion de la sesión

1. **Qué es un locator (20 min).** Un locator es una forma de encontrar algo, no el elemento en sí: se busca de nuevo cada vez que se usa. Playwright prefiere lo que ve el usuario (rol y texto) porque cambia menos que el HTML.
2. **`getByRole`, `getByLabel`, `getByText`, `getByTestId` (30 min).** Recorre la tabla de la guía con la tienda. Usa *pick locator* en el modo UI para que vean qué propone Playwright.
3. **Encadenar y filtrar (20 min).** El botón "Agregar al carrito" de la Taza térmica: primero el artículo con ese título, luego el botón dentro. Pregunta qué pasa si usan solo `getByRole('button', { name: 'Agregar al carrito' })` (strict mode violation: hay 6).
4. **CSS y XPath (20 min).** Escribe `ul > li:nth-child(4) > article > button`, cambia el orden de los productos en `app/server.mjs` y muestra cómo se rompe mientras `getByRole` con filtro sigue funcionando.

## Errores comunes

- Copiar el selector CSS que da DevTools ("Copy selector"): suele ser largo y frágil.
- Usar `nth()` o `first()` para "resolver" un strict mode violation en lugar de hacer el locator específico.
- Buscar por texto parcial que aparece en varios lugares.

## Respuestas de referencia

1. Por rol y nombre accesible primero (`getByRole`), luego label, texto y test id. CSS y XPath solo como último recurso porque dependen de la estructura del HTML.
2. Encontrar el contenedor que los distingue (el artículo de un producto, una fila de tabla) y buscar el botón dentro con `filter`.
3. Cuando el elemento no tiene texto ni rol estable (íconos, contadores, valores que cambian), o el texto cambia por idioma.

## Cierre

Revierte `app/server.mjs`. El lab son 6 pruebas; pide que justifiquen en el PR un locator que hayan elegido.
