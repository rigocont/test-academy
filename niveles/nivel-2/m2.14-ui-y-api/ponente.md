# Notas del ponente: M2.14 UI + API juntos

## Antes de la clase

- Corre `npx playwright test m2.4` y `npx playwright test m2.14` con las soluciones y anota el tiempo de cada uno para la comparación.
- Abre el fixture `paginaPedidos` (stub) en `framework/fixtures.ts`.

## Guion de la sesión

1. **Por qué no todo por UI (20 min).** Una prueba de "pagar pedido" por UI tiene que hacer login, crear el pedido llenando el checkout y buscarlo. Lo único que se prueba es el botón "Marcar como pagado". Lo demás puede ir por API.
2. **Sesión sin pantalla de login (25 min).** `addInitScript` pone el token en `localStorage` antes de cargar la página. Muestra en DevTools > Application que el token está ahí. Adelanta `storageState` del Nivel 3.
3. **Crear por API, validar en UI, y al revés (25 min).** Crea un pedido por API, ábrelo en la UI y págalo con el botón. Luego valida por API que el estado cambió: la API es la fuente de verdad.
4. **Limpieza de datos (20 min).** Crear datos únicos vs borrarlos al terminar. En esta tienda se crean únicos; en un ambiente compartido de verdad, conviene limpiar en el fixture después de `use()`.

## Errores comunes

- Hacer login por API en las pruebas del propio login.
- Validar solo la pantalla después de una acción y no el resultado real.
- Poner el token después de `goto`: la página ya redirigió al login.

## Respuestas de referencia

1. Las que prueban el login mismo: credenciales válidas, inválidas, usuario bloqueado, cerrar sesión.
2. Porque la pantalla puede mostrar "pagado" aunque el servidor no lo haya guardado; la API confirma el resultado real.

## Cierre

Que comparen el tiempo de M2.14 contra M2.4 y lo pongan en el PR.
