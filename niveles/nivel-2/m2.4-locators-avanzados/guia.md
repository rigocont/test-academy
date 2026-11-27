# M2.4 Locators avanzados y estrategia (10 h)

## Objetivo

Automatizar tablas dinámicas, paginación y diálogos modales con locators que no dependan de posiciones fijas.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Tablas: filas, celdas y encabezados por rol |
| 25 min | `filter({ has })`, `exact: true`, `nth()` y cuándo sí usarlo |
| 20 min | Diálogos modales (`<dialog>`) y paginación |
| 25 min | Cómo pedir testabilidad al equipo de desarrollo |

## Conceptos clave

```ts
const tabla = page.getByRole('table', { name: 'Pedidos' });
const filas = tabla.locator('tbody tr');

// Fila por el contenido de una celda. exact: true evita que "#1" encuentre "#12".
const fila = filas.filter({ has: page.getByRole('cell', { name: '#1', exact: true }) });

// Columna por su encabezado, no por posición fija
const encabezados = await tabla.getByRole('columnheader').allTextContents();
const celdaEstado = fila.getByRole('cell').nth(encabezados.indexOf('Estado'));

// Recorrer filas
for (const f of await filas.all()) { ... }
```

`nth()` está bien cuando la posición **es el dato** (la columna N según el encabezado).
Está mal cuando es una suposición ("el producto 4 es la taza").

**Pedir testabilidad:** cuando no hay rol ni texto estable, pide al equipo de desarrollo un
`data-testid` o una etiqueta accesible (`aria-label`). Mejora la automatización y la accesibilidad.

## Lab (4 h + 6 h de práctica)

Completa `framework/paginas/PaginaPedidos.ts`. Corre `npx playwright test m2.4`.
`celda()` debe calcular la posición leyendo los encabezados.

## Preguntas de repaso

1. ¿Por qué las pruebas crean sus propios pedidos en lugar de usar los que ya existen?
2. ¿Cuándo es aceptable usar `nth()`?
3. ¿Qué le pedirías a desarrollo para que esta tabla sea más fácil de probar?
