# Notas del ponente: M0.5 Funciones

## Antes de la clase

- Ten abierta una prueba real del Nivel 1 (por ejemplo `niveles/nivel-1/m1.2-anatomia-de-una-prueba/solucion.spec.ts`) para la demo final.
- Revisa los casos de `esCorreoValido` en el `ejercicio.spec.ts`.

## Guion de la sesión

1. **Qué es una función (20 min).** Copia y pega 3 veces el mismo cálculo de total con descuento. Luego conviértelo en una función y cambia la regla en un solo lugar.
2. **Parámetros, retorno y tipos (25 min).** Escribe `calcularTotal(precios, descuento = 0)`. Llama la función sin descuento y con descuento. Muestra el error de TypeScript al pasar un texto.
3. **Arrow functions (15 min).** La misma función en las dos formas. Diles que en Playwright verán sobre todo arrow functions.
4. **Demo: leer una prueba (30 min).** Abre la prueba real y que ellos señalen cada función: `test`, la arrow function, `goto`, `expect`, `toHaveURL`. Concluye: una prueba es una función que llama funciones.

## Errores comunes

- Olvidar `return`: la función devuelve `undefined` y la prueba recibe `undefined`.
- Declarar el tipo de retorno equivocado y "arreglarlo" con `any`.
- En `esCorreoValido`, validar solo que haya `@` y olvidar los casos sin dominio.

## Respuestas de referencia

1. Agrupa pasos con un nombre para reutilizarlos; si cambia la regla, se cambia en un solo lugar.
2. Usa el valor por defecto del descuento (0) y devuelve 100.
3. `const doble = (n: number) => n * 2;`

## Cierre

Antes de ver las pruebas de `esCorreoValido`, pide que cada quien escriba un caso que se le ocurra y compárenlos.
