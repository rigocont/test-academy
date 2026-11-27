# M3.6 Mocking y virtualización (12 h)

## Objetivo

Probar cómo reacciona la interfaz ante errores, latencia y datos raros que son difíciles de
provocar en un backend real, y saber cuándo un mock da una falsa sensación de seguridad.

## Sesión en vivo (1.5 h, probar una UI sin backend)

| Tiempo | Tema |
|---|---|
| 20 min | `page.route()`: interceptar, `fulfill`, `continue`, `abort`, `fetch` |
| 25 min | En vivo: la página de productos con 500, sin red y con 3 s de latencia |
| 15 min | HAR: grabar respuestas reales y reproducirlas (`routeFromHAR`) |
| 30 min | Cuándo mockear y cuándo no |

## Conceptos clave

```ts
await page.route('**/api/productos', (route) => route.fulfill({ status: 500 }));      // error
await page.route('**/api/productos', (route) => route.fulfill({ json: [/* ... */] })); // datos a la medida
await page.route('**/api/productos', (route) => route.abort('failed'));               // sin red
await page.route('**/api/productos', async (route) => {                                 // modificar lo real
  const response = await route.fetch();
  const json = await response.json();
  json[0].precio = 1;
  await route.fulfill({ response, json });
});
```

- La ruta se registra **antes** de `goto`. Si la página ya pidió los datos, el mock llega tarde.
- `page.route` solo afecta a esa página; `context.route` a todas las del contexto. `request` (APIRequestContext) **no** pasa por `route`.
- **HAR:** `await page.routeFromHAR('datos/productos.har', { update: true })` graba la primera vez; después reproduce.

| Mockea cuando... | No mockees cuando... |
|---|---|
| Quieres probar un error que no puedes provocar (500, timeout) | Quieres saber si la integración funciona |
| Un servicio de terceros cobra o es inestable | El contrato del backend cambia seguido (el mock queda viejo) |
| Necesitas datos extremos (lista vacía, 10 000 elementos) | Es la única prueba de ese flujo |

Regla del curso: por cada flujo con mocks, al menos una prueba de punta a punta sin mocks.

## Lab (3 h + 6 h de práctica)

Resuelve `lab.spec.ts`. Corre `npx playwright test m3.6`.

**Reto:** graba un HAR de `/api/productos` y haz una prueba que corra sin el servidor
(apágalo y usa `routeFromHAR` sin `update`).

## Preguntas de repaso

1. ¿Por qué un mock de `/api/productos` no afecta a `request.get('/api/productos')`?
2. ¿Qué riesgo tiene una suite con 100 % de pruebas con mocks?
3. ¿Qué diferencia hay entre `route.continue()` y `route.fetch()`?
