# Notas del ponente: M3.5 API avanzada

## Antes de la clase

- Corre `npm install` para tener zod y abre `esquemas.ts` (stub) y `esquemas.solucion.ts`.
- Prepara una respuesta de pedido con un campo renombrado para mostrar el error de zod.

## Guion de la sesión

1. **El contrato es la forma completa (20 min).** Muestra una prueba con 5 `expect` sueltos y una respuesta donde `total` se llama `importe`: la prueba solo detecta el campo que revisa.
2. **zod (40 min).** Construye `EsquemaPedido` en vivo: `object`, `number().int()`, `enum`, `array().nonempty()` y `.strict()`. Pasa la respuesta modificada por `parse` y lee el mensaje: dice exactamente qué campo falló.
3. **Tipos desde el esquema (20 min).** `type Pedido = z.infer<typeof EsquemaPedido>`. Una sola fuente de verdad para el tipo y la validación.
4. **APIs asíncronas (25 min).** `POST /api/reportes` responde 202. Muestra un `waitForTimeout(2000)` y luego `expect.poll` con `timeout` e `intervals`. Explica cuándo usar `toPass()`.
5. **Contract testing (15 min).** Introducción: el consumidor publica lo que espera y el proveedor lo verifica en su CI. Se ve a fondo en T4.6.

## Errores comunes

- Usar `.strict()` en contratos que el equipo no controla y romper la suite con cada campo nuevo compatible.
- Validar solo el caso feliz y no las respuestas de error.
- Poner `expect.poll` sin `timeout` o con uno menor al tiempo real del proceso.

## Respuestas de referencia

1. Campos que faltan, sobran o cambiaron de tipo aunque la prueba no los revise uno por uno.
2. Así todas las pruebas validan el contrato sin escribir nada extra, y el esquema se mantiene en un solo lugar.
3. Cuando el backend agrega campos compatibles seguido y no controlas su ritmo de cambios: la suite se rompe sin que haya un error real.
4. Falla al llegar al `timeout` con el último valor que obtuvo.

## Cierre

En su framework: un esquema por endpoint y validación dentro del cliente de API.
