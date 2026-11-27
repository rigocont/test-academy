import { test, expect } from '@playwright/test';

// M2.8 Leer y refactorizar código ajeno
// Estas pruebas PASAN, pero un equipo las heredó y nadie quiere mantenerlas.
// Tu tarea: refactorizarlas usando el framework (fixtures y Page Objects) SIN cambiar
// lo que validan. Al terminar deben seguir pasando.
//
// Antes de tocar nada, escribe en tu PR la lista de "code smells" que encuentres.
// Pistas: nombres, duplicación, datos mágicos, locators frágiles, esperas fijas,
// pruebas que validan muchas cosas, aserciones que no esperan.
//   npx playwright test m2.8

test('test1', async ({ page }) => {
  await page.goto('http://localhost:' + (process.env.PUERTO ?? 3000) + '/');
  await page.locator('input[name=usuario]').fill('estandar');
  await page.locator('input[name=contrasena]').fill('secreto123');
  await page.locator('button[type=submit]').click();
  await page.waitForTimeout(1000);
  await page.locator('ul li:nth-child(4) button').click();
  await page.locator('ul li:nth-child(4) button').click();
  await page.locator('ul li:nth-child(6) button').click();
  expect(await page.locator('.contador').textContent()).toBe('3');
  await page.locator('header a:nth-child(5)').click();
  await page.waitForTimeout(500);
  expect(await page.locator('tbody tr').count()).toBe(2);
  expect(await page.locator('[data-testid=total]').textContent()).toBe('$597 MXN');
  await page.locator('#finalizar').click();
  await page.locator('input[name=nombre]').fill('Ana');
  await page.locator('input[name=apellido]').fill('López');
  await page.locator('input[name=cp]').fill('123');
  await page.locator('button[type=submit]').click();
  expect(await page.locator('#error').textContent()).toBe('El código postal debe tener 5 dígitos');
  await page.locator('input[name=cp]').fill('06600');
  await page.locator('button[type=submit]').click();
  await page.waitForTimeout(500);
  expect(await page.locator('#confirmacion').isVisible()).toBe(true);
});

test('test2', async ({ page }) => {
  await page.goto('http://localhost:' + (process.env.PUERTO ?? 3000) + '/');
  await page.locator('input[name=usuario]').fill('estandar');
  await page.locator('input[name=contrasena]').fill('secreto123');
  await page.locator('button[type=submit]').click();
  await page.waitForTimeout(1000);
  await page.locator('#categoria').selectOption('electronica');
  expect(await page.locator('article').count()).toBe(2);
  await page.locator('#buscar').fill('xyz');
  expect(await page.locator('#sin-resultados').isVisible()).toBe(true);
});
