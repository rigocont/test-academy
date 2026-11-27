# M2.3 Fixtures (10 h)

## Objetivo

Preparar lo que cada prueba necesita con fixtures de Playwright en lugar de `beforeEach` y `new` repetidos.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Qué es un fixture: `page` y `request` ya lo son |
| 30 min | `test.extend`: crear fixtures propios |
| 20 min | Fixtures que dependen de otros, y opciones (`test.use`) |
| 20 min | Fixtures vs `beforeEach`: cuándo usar cada uno |

## Conceptos clave

```ts
export const test = base.extend<{ paginaLogin: PaginaLogin }>({
  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);   // 1. preparar
    await paginaLogin.abrir();
    await use(paginaLogin);                      // 2. entregar a la prueba
    // 3. lo que vaya aquí corre al terminar la prueba (limpieza)
  },
});

test('login', async ({ paginaLogin }) => { ... });   // se pide por nombre
```

- Un fixture **solo se crea si la prueba lo pide**. `beforeEach` corre siempre.
- Los fixtures se componen: `paginaProductos` usa `paginaLogin`, que usa `page`.
- Las **opciones** se declaran con `[valorPorDefecto, { option: true }]` y se cambian con `test.use({ usuario: 'admin' })`.
- Las pruebas importan `test` y `expect` desde `framework/fixtures`, no desde `@playwright/test`.

## Lab (4 h + 6 h de práctica)

Completa `paginaProductos`, `paginaCarrito` y `paginaCheckout` en `framework/fixtures.ts`.
Corre `npx playwright test m2.3`.

**Reto:** cuenta las líneas de `m2.2-page-object-model/lab.spec.ts` y de `m2.3-fixtures/lab.spec.ts`
para las mismas pruebas.

## Preguntas de repaso

1. ¿Qué diferencia hay entre un fixture y un `beforeEach`?
2. ¿Qué pasa con el código que va después de `use()`?
3. ¿Cómo correrías el mismo archivo de pruebas con otro usuario?
