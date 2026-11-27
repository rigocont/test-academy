# M0.5 Funciones (10 h)

## Objetivo

Escribir funciones con tipos, parámetros opcionales y arrow functions. Entender que
**una prueba de Playwright es una función**.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Qué es una función y por qué evita repetir código |
| 25 min | Parámetros, retorno, tipos, parámetros por defecto |
| 15 min | Arrow functions |
| 30 min | Demo: leer una prueba de Playwright y reconocer las funciones que usa |

## Conceptos clave

```ts
// nombre   parámetros con tipo        tipo de retorno
function sumar(a: number, b: number): number {
  return a + b;
}

// Parámetro por defecto
function saludar(nombre: string, idioma: string = 'es'): string {
  return idioma === 'es' ? `Hola, ${nombre}` : `Hello, ${nombre}`;
}

// Arrow function: la misma idea, otra forma de escribirla
const doble = (n: number): number => n * 2;

// Una función que usa otra
function esPar(n: number): boolean { return n % 2 === 0; }
function contarPares(nums: number[]): number {
  let total = 0;
  for (const n of nums) if (esPar(n)) total++;
  return total;
}
```

Así se ve una prueba de Playwright. Todo son funciones:

```ts
test('login exitoso', async ({ page }) => {   // test() recibe un nombre y una arrow function
  await page.goto('/');                        // goto() es una función de page
  await expect(page).toHaveURL(/productos/);   // expect() y toHaveURL() también
});
```

## Lab (4 h)

Completa las 5 funciones de `ejercicio.ts`. Corre `npx playwright test m0.5`.

## Preguntas de repaso (pregunta A de Automatización del examen)

1. ¿Qué es una función y por qué es útil en automatización?
2. ¿Qué pasa si llamas `calcularTotal([100])` sin descuento?
3. Reescribe `function doble(n: number) { return n * 2; }` como arrow function.

## Para el instructor

- `esCorreoValido` tiene varios casos borde. Pide a los alumnos que agreguen una prueba más que se les ocurra antes de ver las existentes.
