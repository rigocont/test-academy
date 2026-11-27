# Notas del ponente: M1.2 Anatomía de una prueba

## Antes de la clase

- Escribe en una hoja el caso manual "login exitoso" (precondición, pasos, resultado esperado) para convertirlo en vivo.
- Ten la tienda abierta en la página de login.

## Guion de la sesión

1. **Las partes (15 min).** `test` (nombre y función), `page` (una pestaña limpia por prueba) y `expect` (la validación). Sin `expect` no hay prueba.
2. **Acciones (25 min).** Muestra `goto`, `fill`, `click`, `check`, `selectOption` y `press` en la página de checkout, que tiene campos, casillas y listas.
3. **Del caso manual a la prueba (30 min).** Toma el caso escrito y tradúcelo línea por línea. Precondición se vuelve Arrange, pasos se vuelven Act, resultado esperado se vuelve Assert. Córrela con `--headed`.
4. **Arrange-Act-Assert (20 min).** Muestra una prueba que valida 5 cosas y falla en la primera: no sabes si las otras 4 funcionan. Divídela en pruebas pequeñas.

## Errores comunes

- Nombres como "prueba login 2". El nombre debe decir el resultado esperado.
- Suponer que la segunda prueba ya tiene la sesión de la primera. Cada prueba tiene su propio contexto.
- Pruebas sin `expect`: corren, pasan y no prueban nada.

## Respuestas de referencia

1. Para poder correrla en cualquier orden, en paralelo o sola al depurar, sin depender de otras.
2. El resultado esperado.
3. Las otras 4 validaciones no se ejecutan: no sabes si funcionan y el reporte esconde información.

## Cierre

Recuerda la segunda parte del lab: automatizar 3 casos que escribieron en el Nivel 0.
