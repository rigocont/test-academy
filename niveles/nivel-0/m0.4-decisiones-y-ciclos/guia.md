# M0.4 Decisiones y ciclos (10 h)

## Objetivo

Tomar decisiones con `if` y `switch`, y repetir acciones con ciclos. Lo vas a usar para
validar rangos y recorrer listas de datos de prueba.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 25 min | Operadores de comparación y lógicos, `if / else if / else` |
| 15 min | `switch` |
| 30 min | `for`, `for...of`, `while` |
| 20 min | Caso de QA: valores límite con `if` |

## Conceptos clave

```ts
// Comparación: ===  !==  >  <  >=  <=      Lógicos: &&  ||  !
if (status >= 200 && status <= 299) {
  console.log('Éxito');
} else if (status === 404) {
  console.log('No encontrado');
} else {
  console.log('Otro');
}

switch (navegador) {
  case 'chromium':
    return 'Chrome';
  default:
    return 'Otro';
}

for (let i = 1; i <= 3; i++) { /* i vale 1, 2, 3 */ }

for (const resultado of ['paso', 'fallo']) { /* un elemento a la vez */ }
```

> Usa siempre `===` (tres iguales). `==` convierte tipos y da sorpresas: `'1' == 1` es `true`.

**Valores límite:** si una edad válida va de 18 a 99, las pruebas importantes son 17, 18, 99 y 100.
El ejercicio `esEdadValida` las usa. Es la misma técnica que vas a aplicar en el Nivel 2.

## Lab (4 h)

Completa las 5 funciones de `ejercicio.ts`. Corre `npx playwright test m0.4`.

## Preguntas de repaso

1. ¿Por qué se prueban 17 y 100 si no son edades válidas?
2. ¿Cuándo conviene `switch` en lugar de varios `if`?
3. ¿Qué diferencia hay entre `for` y `for...of`?

## Para el instructor

- Fíjate en quien escribe `edad > 18` en lugar de `>=`: es justo el bug que encuentran las pruebas de límites. Úsalo como ejemplo.
