# Notas del ponente: M0.8 Asincronía

## Antes de la clase

- Prepara dos versiones de la misma prueba de login: con `await` y sin `await`.
- Abre `saludarUsuario` del ejercicio, que tiene el `await` faltante.

## Guion de la sesión

1. **Por qué es asíncrono (20 min).** Analogía: pedir comida en un restaurante. No te quedas parado en la cocina; te dan un ticket (la promesa) y sigues. Abre DevTools y muestra que `/api/productos` tarda 600 ms.
2. **Promesas, `async` y `await` (25 min).** Escribe `cargar()` con `fetch`. Imprime la promesa sin `await` (`Promise { <pending> }`) y luego con `await`.
3. **`try/catch` (20 min).** Consulta un usuario que no existe y atrapa el error. Explica que en las pruebas casi nunca se atrapa: se deja que la prueba falle.
4. **Demo con y sin `await` (25 min).** Corre la prueba sin `await`: pasa sin validar nada o falla con un error raro. Agrega los `await` y vuelve a correr. Esta demo es la más importante del nivel.

## Errores comunes

- Olvidar `await` antes de `expect(locator)`: la prueba pasa sin validar.
- Usar `await` dentro de una función que no es `async`.
- Querer "arreglar" esperas con un tiempo fijo.

## Respuestas de referencia

1. La prueba sigue sin esperar: la acción puede no haber pasado cuando llega la validación, o la validación nunca se evalúa.
2. Si la app tarda más, falla; si tarda menos, desperdicias tiempo. Hay que esperar una condición, no un tiempo.

## Cierre

`esperarHasta` es una versión simple del auto-waiting de Playwright. Pide que expliquen en su PR por qué `saludarUsuario` recibía `undefined`.
