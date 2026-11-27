# Notas del ponente: M1.8 Organizar pruebas

## Antes de la clase

- Abre el `lab.spec.ts` de M1.8 (el archivo desordenado) para mostrar el antes.
- Ten el reporte HTML de una suite con `describe` anidados para mostrar cómo se ven los nombres.

## Guion de la sesión

1. **`test.describe` (20 min).** Agrupa las pruebas de checkout y muestra el nombre completo en el reporte (`Checkout › validaciones del formulario › nombre vacío muestra error`).
2. **Hooks (25 min).** `beforeEach` corre antes de cada prueba y las mantiene independientes. `beforeAll` corre una vez para todo el grupo: si guarda estado (una página, un usuario), las pruebas empiezan a depender unas de otras. Muestra el problema con un ejemplo.
3. **Funciones auxiliares (20 min).** Extrae `iniciarSesion(page)` y `agregarProducto(page, nombre)`. La prueba queda en lenguaje de negocio.
4. **Convenciones de la academia (25 min).** Recorre la lista y revisa juntos un PR real con esos criterios.

## Errores comunes

- Usar `beforeAll` para hacer login y compartir la página entre pruebas.
- Funciones auxiliares que hacen `expect` escondidos y fallan con mensajes confusos.
- Entregar `test.only` y que en el CI corra una sola prueba.

## Respuestas de referencia

1. `beforeEach` corre antes de cada prueba; `beforeAll`, una sola vez antes de todas las pruebas del grupo.
2. Si la anterior falla o cambia el orden, la siguiente falla aunque su funcionalidad esté bien, y no se puede correr sola ni en paralelo.

## Cierre

Menciona que en el Nivel 2 estas funciones auxiliares se convierten en Page Objects y fixtures.
