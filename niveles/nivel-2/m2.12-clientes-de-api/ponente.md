# Notas del ponente: M2.12 Utilidades de API reutilizables

## Antes de la clase

- Abre `framework/clientes/ClienteApi.ts` (completo), `ClientePedidos.ts` (stub) y `tipos.ts`.
- Ten a mano una prueba de M2.11 con rutas y headers repetidos para el antes.

## Guion de la sesión

1. **El problema (20 min).** Muestra 4 pruebas con `'/api/pedidos'`, el header y `.json()` repetidos. Cambia la ruta de la API y cuenta cuántos lugares hay que tocar.
2. **Un cliente por recurso (30 min).** `ClienteApi` pone el token; `ClientePedidos` sabe las rutas de pedidos. Implementa `crear` y `obtener` en vivo.
3. **Tipar respuestas (20 min).** Con `Promise<Pedido>` el editor autocompleta `pedido.estado` y marca `pedido.status` como error.
4. **Crudos y Ok (20 min).** `crear` devuelve la respuesta para probar errores; `crearOk` valida 201 y devuelve el pedido para preparar datos. Muestra el mensaje de falla de `crearOk` con el cuerpo del error incluido.

## Errores comunes

- Métodos que siempre validan 2xx: ya no puedes probar los errores.
- Devolver `any` en lugar del tipo.
- Poner aserciones del caso de prueba dentro del cliente.

## Respuestas de referencia

1. Se lee en lenguaje de negocio, no repite rutas ni headers, y si cambia la API se corrige en un solo lugar.
2. Para que, si falla, el reporte muestre por qué el servidor rechazó el pedido sin tener que depurar.

## Cierre

El fixture `pedidos` del framework ya entrega un `ClientePedidos` con el token: lo usarán desde M2.13.
