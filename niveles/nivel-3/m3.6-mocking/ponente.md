# Notas del ponente: M3.6 Mocking y virtualización

## Antes de la clase

- Abre `/productos.html` con sesión iniciada y DevTools en Network.
- Prepara un HAR grabado de `/api/productos` para la demo de `routeFromHAR`.

## Guion de la sesión

1. **`page.route()` (20 min).** Intercepta `/api/productos` y recorre las cuatro respuestas posibles: `fulfill`, `continue`, `abort` y `fetch` + `fulfill`.
2. **La página con errores (25 min).** En vivo: respuesta 500 (aparece el mensaje de error), sin red con `abort` (mismo mensaje), 3 segundos de latencia ("Cargando productos..." visible) y un solo producto falso.
3. **HAR (15 min).** `routeFromHAR` con `update: true` graba; sin `update`, reproduce. Apaga el servidor y corre la prueba con el HAR.
4. **Cuándo mockear y cuándo no (30 min).** Discute la tabla de la guía. Caso: una suite con 100 % de mocks pasa en verde y producción está caída porque cambió el contrato. Regla del curso: por cada flujo con mocks, al menos una prueba de punta a punta sin mocks.

## Errores comunes

- Registrar la ruta después de `goto`: la petición ya salió.
- Esperar que `page.route` afecte a `request.get`: el `APIRequestContext` no pasa por las rutas de la página.
- Mocks que nadie actualiza cuando cambia la API.

## Respuestas de referencia

1. Porque `request` es un cliente HTTP independiente del navegador; las rutas solo interceptan lo que pide la página.
2. Que todo pase aunque la integración real esté rota: los mocks prueban la reacción de la UI, no que el backend funcione.
3. `continue()` deja pasar la petición al servidor (opcionalmente modificada); `fetch()` la hace por ti y te devuelve la respuesta para que la cambies antes de entregarla con `fulfill`.

## Cierre

Reto: grabar un HAR y correr una prueba con el servidor apagado.
