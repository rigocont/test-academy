# M0.8 Asincronía (6 h)

## Objetivo

Entender qué es una promesa, cuándo hace falta `await` y por qué el navegador obliga a esperar.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Por qué el navegador y las APIs son asíncronos |
| 25 min | Promesas, `async` y `await` |
| 20 min | Errores con `try/catch` |
| 25 min | Demo: la misma prueba de Playwright con y sin `await` |

## Conceptos clave

```ts
// Una promesa es "un valor que llegará después"
const promesa = fetch('/api/productos');      // todavía no hay respuesta

async function cargar() {                     // async: esta función usa await
  const respuesta = await fetch('/api/productos'); // await: espera aquí
  return respuesta.json();
}

// Errores en código asíncrono
try {
  await consultarUsuario(99);
} catch (error) {
  console.log('No existe');
}
```

**La regla para Playwright:** casi todo lo que hace `page` o `expect(locator)` devuelve
una promesa. Si olvidas `await`, la prueba sigue sin esperar y falla de formas raras
o, peor, pasa sin haber validado nada.

```ts
// MAL: no espera el clic ni la validación
page.getByRole('button', { name: 'Entrar' }).click();
expect(page.getByText('Productos')).toBeVisible();

// BIEN
await page.getByRole('button', { name: 'Entrar' }).click();
await expect(page.getByText('Productos')).toBeVisible();
```

## Lab (4 h)

1. Corrige `saludarUsuario` (le falta un `await`).
2. Completa las otras 3 funciones.
3. Corre `npx playwright test m0.8`.

`esperarHasta` es una versión simple de lo que Playwright hace por ti con el auto-waiting.

## Preguntas de repaso (pregunta A de Automatización del examen)

1. ¿Qué pasa si olvidas `await` antes de una acción de Playwright?
2. ¿Por qué no conviene esperar un tiempo fijo, como 3 segundos?

## Para el instructor

- TypeScript no siempre marca un `await` faltante, por eso el primer ejercicio es encontrarlo a mano. Pide que expliquen por qué la prueba recibía `undefined`.
