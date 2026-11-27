# M0.3 Variables y tipos (8 h)

## Objetivo

Guardar datos en variables con el tipo correcto y armar textos con template strings.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | `let` vs `const` |
| 30 min | Tipos básicos y por qué TypeScript avisa antes de correr |
| 20 min | Template strings |
| 20 min | Demo: el primer `TODO` del ejercicio y cómo leer una prueba que falla |

## Conceptos clave

```ts
const usuario = 'estandar';  // const: no cambia. Úsalo por defecto.
let intentos = 0;            // let: cuando el valor sí cambia.
intentos = intentos + 1;

// Tipos básicos
const nombre: string = 'Ana';
const precio: number = 1299;      // enteros y decimales son number
const activo: boolean = true;
let cupon: string | undefined;    // todavía sin valor

// TypeScript te avisa ANTES de correr:
// const total: number = '100';   ← Error: string no es number

// Template strings: comillas invertidas y ${ }
const url = `http://localhost:${3000}/productos.html`;
const saludo = `Hola, ${nombre}. Total: ${precio * 2}`;
```

**Cómo leer una prueba que falla:**

```text
Expected: "estandar"
Received: ""
```

*Expected* es lo que la prueba espera; *Received* es lo que tu código produjo.

## Lab (4 h)

Completa `ejercicio.ts` y corre `npx playwright test m0.3` hasta que las 6 pruebas pasen.

**Reto extra:** agrega en `ejercicio.ts` una variable `navegadores` con el tipo `string[]`
y los valores `chromium`, `firefox` y `webkit`. ¿Qué error da TypeScript si agregas un número?

## Preguntas de repaso

1. ¿Cuándo usarías `let` en lugar de `const`?
2. ¿Qué ventaja tiene que TypeScript marque un error antes de correr la prueba?
3. Escribe un template string que arme el mensaje "Prueba 3 de 10".

## Para el instructor

- Muestra en VS Code cómo el subrayado rojo aparece antes de correr nada.
- Si alguien usa comillas normales en lugar de invertidas, el `${}` no funciona: es el error más común.
