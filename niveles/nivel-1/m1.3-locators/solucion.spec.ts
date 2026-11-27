import { test, expect } from '@playwright/test';
import { iniciarSesion } from '../soporte';

test.beforeEach(async ({ page }) => {
  await iniciarSesion(page);
});

test('ejemplo: encontrar un producto por su nombre y agregarlo', async ({ page }) => {
  const taza = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Taza térmica' }) });
  await taza.getByRole('button', { name: 'Agregar al carrito' }).click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});

test('getByLabel: buscar un producto', async ({ page }) => {
  await page.getByLabel('Buscar producto').fill('teclado');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Teclado mecánico' })).toBeVisible();
});

test('getByRole con nombre: agregar los audífonos', async ({ page }) => {
  const audifonos = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Audífonos inalámbricos' }) });
  const boton = audifonos.getByRole('button');
  await boton.click();
  await expect(boton).toHaveText('Agregado');
});

test('selectOption: filtrar por categoría', async ({ page }) => {
  await page.getByLabel('Categoría').selectOption({ label: 'Electrónica' });
  await expect(page.getByRole('article')).toHaveCount(2);
});

test('getByText: mensaje sin resultados', async ({ page }) => {
  await page.getByLabel('Buscar producto').fill('bicicleta');
  await expect(page.getByText('No hay productos que coincidan')).toBeVisible();
});

test('CSS y XPath: el mismo elemento de dos formas', async ({ page }) => {
  await expect(page.locator('[data-testid="producto-1"] .precio')).toContainText('$899');
  await expect(page.locator('xpath=//article[h2="Mochila de viaje"]/p[@class="precio"]')).toContainText('$899');
});

test('reescribir un locator frágil', async ({ page }) => {
  await page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: 'Taza térmica' }) })
    .getByRole('button', { name: 'Agregar al carrito' })
    .click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});
