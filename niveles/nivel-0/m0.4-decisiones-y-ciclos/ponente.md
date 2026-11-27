# Notas del ponente: M0.4 Decisiones y ciclos

## Antes de la clase

- Abre el ejercicio de M0.4 y ten lista la función `esEdadValida` para el caso de valores límite.
- Prepara en una hoja la tabla de edades 17, 18, 99 y 100 para dibujarla.

## Guion de la sesión

1. **Comparaciones y `if` (25 min).** Usa códigos HTTP como ejemplo: 2xx es éxito, 404 no encontrado. Muestra `'1' == 1` en la consola de Node para justificar `===` siempre.
2. **`switch` (15 min).** Convierte un `if/else if` largo en `switch` y pregunta cuál se lee mejor.
3. **Ciclos (30 min).** `for` clásico para contar, `for...of` para recorrer resultados de pruebas, `while` para "repetir hasta que". Advierte del ciclo infinito y cómo detenerlo con Ctrl+C.
4. **Caso de QA: valores límite (20 min).** Escribe `edad > 18` a propósito, corre las pruebas y deja que descubran por qué 18 falla. Esa es la técnica de valores límite que verán a fondo en el Nivel 2.

## Errores comunes

- `>` en lugar de `>=` en los límites.
- Olvidar `break` en un `switch` y caer en el siguiente caso.
- Usar `for...in` en un arreglo (recorre índices como texto) en lugar de `for...of`.

## Respuestas de referencia

1. Porque los errores se concentran en los bordes: un `>` en lugar de `>=` solo se detecta probando justo en el límite y fuera de él.
2. Cuando comparas una sola variable contra muchos valores fijos.
3. `for` controla un índice; `for...of` entrega directamente cada elemento.

## Cierre

Pide que en su PR expliquen en una línea qué caso límite les falló primero.
