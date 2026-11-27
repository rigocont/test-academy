# Notas del ponente: M0.6 Arreglos y objetos

## Antes de la clase

- Levanta la tienda (`npm run app`) y abre `http://localhost:3000/api/productos` para conectar el ejercicio con datos reales.
- Ten a mano la `interface Producto` de la guía.

## Guion de la sesión

1. **Objetos e `interface` (20 min).** Define `Producto` y muestra cómo VS Code autocompleta `p.` y marca una propiedad mal escrita.
2. **Arreglos (20 min).** Crear, leer por índice, `push`, `length`. Pregunta qué devuelve `productos[10]` y deja que lo prueben.
3. **`map`, `filter`, `find`, `sort` (35 min).** Con los 6 productos de la tienda: nombres (`map`), baratos (`filter`), el producto 4 (`find`), ordenar por precio (`sort`). Recalca que `sort` modifica el arreglo original.
4. **JSON (15 min).** Abre la API en el navegador y muestra que es el mismo arreglo en texto. `JSON.parse` y `JSON.stringify` en la consola.

## Errores comunes

- Usar el resultado de `find` sin revisar que no sea `undefined`.
- `sort()` sin función de comparación ordena números como texto (`[10, 9].sort()` da `[10, 9]`).
- Confundir `map` (mismo tamaño, transforma) con `filter` (menos elementos, mismos objetos).

## Respuestas de referencia

1. `undefined`. Si la prueba no lo revisa, falla después con un error confuso como "cannot read properties of undefined".
2. `map` transforma cada elemento; `filter` se queda con los que cumplen una condición.
3. Describe la forma de un objeto para que TypeScript valide propiedades y tipos.

## Cierre

Adelanta que en el Nivel 1 tiparán las respuestas de la API con una `interface` igual a esta.
