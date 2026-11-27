# M1.5 Esperas (10 h)

## Objetivo

Entender el auto-waiting de Playwright, eliminar esperas fijas y corregir pruebas inestables (flaky).

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Por qué las pruebas de UI fallan "a veces" |
| 25 min | Auto-waiting: qué revisa Playwright antes de cada acción |
| 25 min | Demo: la prueba del reporte con `waitForTimeout`, correrla 10 veces y arreglarla |
| 20 min | Esperar navegación y respuestas de red |

## Conceptos clave

Antes de un `click()`, Playwright espera a que el elemento exista, sea visible, esté estable,
habilitado y reciba eventos. Las web-first assertions reintentan hasta cumplirse.
Por eso casi nunca necesitas esperar a mano.

```ts
// MAL: espera fija. Si el servidor tarda más, falla. Si tarda menos, pierdes tiempo.
await page.waitForTimeout(3000);

// BIEN: espera a que pase lo que te importa
await expect(page.getByRole('status')).toHaveText('Reporte listo');
await expect(page.getByText('Cargando productos...')).toBeHidden();
await expect(page).toHaveURL(/productos/);

// Esperar una respuesta de red: se prepara ANTES de la acción que la provoca
const respuesta = page.waitForResponse('**/api/productos');
await page.reload();
expect((await respuesta).status()).toBe(200);
```

**Encontrar pruebas inestables:**

```bash
npx playwright test m1.5 --repeat-each=10
```

En la tienda hay tres puntos lentos a propósito: la API de productos (600 ms), el usuario
`lento` (1.5 s al entrar) y el reporte de ventas (entre 1 y 3 s, al azar).

## Lab (4 h + práctica)

Resuelve las 4 pruebas de `lab.spec.ts`. La prueba del reporte debe pasar con `--repeat-each=10`.

## Preguntas de repaso (pregunta A de Automatización del examen)

1. ¿Cómo esperas a que un elemento cargue antes de interactuar con él?
2. ¿Por qué `waitForTimeout` hace las pruebas lentas e inestables a la vez?
3. ¿Por qué `waitForResponse` se llama antes de la acción y no después?

## Para el instructor

- Corre la versión con `waitForTimeout` en vivo con `--repeat-each=10` para que vean las fallas al azar.
