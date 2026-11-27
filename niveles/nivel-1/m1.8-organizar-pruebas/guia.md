# M1.8 Organizar pruebas (8 h)

## Objetivo

Agrupar pruebas, quitar setup repetido y nombrar pruebas para que la suite se lea como una lista de requisitos.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | `test.describe` y grupos anidados |
| 25 min | Hooks: `beforeEach`, `afterEach`, `beforeAll` y cuándo no usar `beforeAll` |
| 20 min | Funciones auxiliares para pasos repetidos |
| 25 min | Convenciones de la academia |

## Conceptos clave

```ts
test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    // Corre antes de CADA prueba del grupo. Cada prueba sigue siendo independiente.
    await iniciarSesion(page);
  });

  test('con datos válidos confirma el pedido', async ({ page }) => { /* ... */ });

  test.describe('validaciones del formulario', () => {
    test('nombre vacío muestra error', async ({ page }) => { /* ... */ });
  });
});
```

En el reporte se ve así: `Checkout › validaciones del formulario › nombre vacío muestra error`.

**Convenciones de la academia:**

- Un archivo por funcionalidad (`login.spec.ts`, `carrito.spec.ts`).
- El nombre de la prueba dice el resultado esperado.
- Nada de datos compartidos entre pruebas. Si una prueba necesita algo, lo prepara ella o el `beforeEach`.
- Los pasos repetidos van en funciones con nombre claro (`irAlCheckout`, `agregarProducto`).
- `test.only` y `page.pause()` nunca se entregan.

## Lab (4 h)

Reorganiza `lab.spec.ts` siguiendo las instrucciones del archivo.

## Preguntas de repaso

1. ¿Qué diferencia hay entre `beforeEach` y `beforeAll`?
2. ¿Por qué no conviene que una prueba dependa de lo que dejó la anterior?

## Para el instructor

- En el Nivel 2 estas funciones auxiliares se convierten en Page Objects y fixtures. Menciónalo.
