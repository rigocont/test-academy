# Notas del ponente: M2.7 Colecciones y datos

## Antes de la clase

- Abre `framework/datos/productos.csv` y `framework/datos/generadores.ts`.
- Ten un JSON pequeño de usuarios para la demo de lectura.

## Guion de la sesión

1. **Dónde viven los datos (20 min).** En el código (pocos casos, legibles), en archivos (muchos casos, los edita alguien que no programa) o generados (deben ser únicos). Pide ejemplos de su trabajo para cada uno.
2. **JSON y CSV (25 min).** `readFileSync` + `JSON.parse`. Para CSV: separar líneas, encabezados y columnas. Muestra los casos borde: línea vacía al final, espacios, comillas.
3. **`Map` y `Set` (25 min).** Agrupa productos por categoría con `Map`. Encuentra ids duplicados con `Set`. Compara con hacerlo con objetos y arreglos.
4. **Datos únicos (20 min).** `clienteUnico()`: por qué incluye tiempo, proceso y contador. Corre dos pruebas en paralelo que crean "Cliente QA" fijo y muestra cómo se cruzan los datos.

## Errores comunes

- Rutas relativas que funcionan solo desde una carpeta: usar `import.meta.dirname` o rutas desde la raíz del proyecto.
- CSV con una línea vacía al final que se convierte en un registro vacío.
- Números del CSV que se quedan como texto (`'249'` en lugar de `249`).

## Respuestas de referencia

1. Cuando son muchos casos, cuando los mantiene alguien que no programa o cuando se comparten entre suites.
2. Acepta cualquier tipo de llave, conserva el orden de inserción y tiene `size`, `has` y `get` sin trucos.

## Cierre

Su `leerCsv` se reutiliza en M2.13: que lo dejen bien probado.
