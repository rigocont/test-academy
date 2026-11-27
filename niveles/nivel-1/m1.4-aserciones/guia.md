# M1.4 Aserciones (10 h)

## Objetivo

Escribir aserciones que validen de verdad, que esperen solas y que den mensajes de error útiles.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Qué hace una buena aserción |
| 30 min | Web-first assertions vs aserciones genéricas |
| 20 min | Soft assertions y mensajes personalizados |
| 20 min | Demo: una prueba que "pasa sin probar nada" |

## Conceptos clave

**Web-first assertions** (sobre un locator o la página). Reintentan hasta que se cumplen
o se acaba el tiempo (5 s por defecto). Siempre llevan `await`.

```ts
await expect(page).toHaveURL(/productos/);
await expect(page).toHaveTitle('Tienda QA | Carrito');
await expect(page.getByTestId('total')).toHaveText('$597 MXN');
await expect(page.getByRole('article')).toHaveCount(6);
await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
await expect(page.getByRole('link', { name: 'Finalizar compra' })).toBeHidden();
```

**Aserciones genéricas** (sobre un valor que ya tienes). No reintentan.

```ts
expect(productos).toHaveLength(6);
expect(usuario.rol).toBe('qa');
expect(lista).toContain('Taza térmica');
```

**El error más común:**

```ts
// MAL: lee el texto una sola vez, en ese instante. Si la página aún no se actualiza, falla.
expect(await page.getByTestId('contador-carrito').textContent()).toBe('1');

// BIEN: espera hasta que el contador diga "1"
await expect(page.getByTestId('contador-carrito')).toHaveText('1');
```

**Soft assertions:** `expect.soft(...)` no detiene la prueba; reporta todas las fallas al final.
Útil para revisar varios datos de una pantalla.

**Mensaje personalizado:** `await expect(locator, 'el total debe incluir 2 tazas').toHaveText(...)`.

## Lab (4 h + práctica)

Resuelve las 6 pruebas pendientes de `lab.spec.ts`. La última es una prueba que siempre pasa: encuentra por qué.

## Preguntas de repaso

1. ¿Por qué `toHaveText` es mejor que comparar `textContent()`?
2. ¿Cuándo usarías `expect.soft`?
3. ¿Cómo te das cuenta de que una prueba no está validando nada?

## Para el instructor

- Técnica útil: pide que cambien el valor esperado a propósito para comprobar que la prueba falla. Una prueba que nunca ha fallado no está demostrada.
