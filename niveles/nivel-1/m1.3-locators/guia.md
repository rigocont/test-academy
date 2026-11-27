# M1.3 Locators (14 h)

## Objetivo

Encontrar elementos de forma robusta y saber leer CSS y XPath cuando no hay otra opción.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Qué es un locator y por qué Playwright prefiere "lo que ve el usuario" |
| 30 min | `getByRole`, `getByLabel`, `getByText`, `getByTestId` |
| 20 min | Encadenar y filtrar: `filter({ has })`, `filter({ hasText })` |
| 20 min | CSS y XPath: leerlos, y por qué son frágiles |

## Conceptos clave

**Orden de preferencia:**

| # | Locator | Cuándo | Ejemplo en la tienda |
|---|---|---|---|
| 1 | `getByRole` | Botones, enlaces, títulos, tablas, campos | `getByRole('button', { name: 'Entrar' })` |
| 2 | `getByLabel` | Campos de formulario con etiqueta | `getByLabel('Código postal')` |
| 3 | `getByText` | Textos que no son interactivos | `getByText('Tu carrito está vacío')` |
| 4 | `getByTestId` | Cuando no hay texto o rol estable | `getByTestId('contador-carrito')` |
| 5 | CSS | Último recurso | `locator('[data-testid="total"]')` |
| 6 | XPath | Último recurso | `locator('xpath=//article[h2="Taza térmica"]')` |

```ts
// Buscar DENTRO de otro elemento: el botón de un producto específico
const taza = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Taza térmica' }) });
await taza.getByRole('button', { name: 'Agregar al carrito' }).click();
```

**Por qué evitar locators frágiles:** `ul > li:nth-child(4) > article > button` se rompe si
cambia el orden de los productos o el HTML. `getByRole` con nombre sigue funcionando
mientras el usuario vea lo mismo.

**Herramientas:** en el modo UI (`--ui`) y en el Inspector hay un botón para elegir un elemento
de la página y ver el locator que Playwright recomienda.

## Lab (4 h + 6 h de práctica)

Resuelve las 6 pruebas pendientes de `lab.spec.ts`.

## Preguntas de repaso (pregunta A de Automatización del examen)

1. ¿Cómo encuentras un elemento en una página (ID, XPath, CSS selector)? ¿Cuál prefieres y por qué?
2. ¿Qué haces si dos botones dicen lo mismo?
3. ¿Cuándo pedirías un `data-testid` al equipo de desarrollo?

## Para el instructor

- Haz un ejercicio en vivo: cambia el orden de los productos en `app/server.mjs` y muestra qué locators se rompen.
