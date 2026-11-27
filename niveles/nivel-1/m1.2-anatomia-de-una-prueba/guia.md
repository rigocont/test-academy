# M1.2 Anatomía de una prueba (10 h)

## Objetivo

Convertir un caso de prueba manual en una prueba de Playwright clara, con la estructura Arrange-Act-Assert.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 15 min | Las partes de una prueba: `test`, `page`, `expect` |
| 25 min | Acciones: `goto`, `click`, `fill`, `check`, `selectOption`, `press` |
| 30 min | Demo: del caso de prueba manual "login exitoso" a la prueba automatizada |
| 20 min | Arrange-Act-Assert y por qué cada prueba valida una sola cosa |

## Conceptos clave

```ts
import { test, expect } from '@playwright/test';

//    nombre que dice qué se espera          fixture page: una pestaña nueva y limpia
test('usuario bloqueado ve un mensaje', async ({ page }) => {
  // Arrange: preparar
  await page.goto('/');

  // Act: la acción que se prueba
  await page.getByLabel('Usuario').fill('bloqueado');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();

  // Assert: validar el resultado
  await expect(page.getByRole('alert')).toHaveText('Este usuario está bloqueado');
});
```

| Caso de prueba manual | Prueba automatizada |
|---|---|
| Precondición | Arrange |
| Pasos | Act |
| Resultado esperado | Assert |

**Cada prueba es independiente.** Playwright abre un contexto de navegador nuevo para cada
prueba: no comparten cookies ni `localStorage`. Por eso cada prueba hace su propio login.

## Lab (4 h + práctica)

Resuelve las 4 pruebas pendientes de `lab.spec.ts`. Después automatiza 3 de los casos de
prueba que escribiste en el Nivel 0 (M0.0), en un archivo nuevo de tu rama.

## Preguntas de repaso

1. ¿Por qué cada prueba tiene que poder correr sola?
2. ¿Qué parte del caso manual corresponde a `expect`?
3. ¿Qué pasa si una prueba valida 5 cosas distintas y falla la primera?

## Para el instructor

- Pide nombres de prueba que digan el resultado esperado. "Prueba login 2" no se acepta en el PR.
