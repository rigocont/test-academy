import { test, expect, type Page } from '@playwright/test';
import { iniciarSesion } from '../soporte';

async function agregar(page: Page, nombre: string) {
  await page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: nombre }) })
    .getByRole('button') // sin nombre: después del primer clic el botón dice "Agregado"
    .click();
}

async function llenarCarrito(page: Page) {
  await agregar(page, 'Taza térmica');
  await agregar(page, 'Taza térmica');
  await agregar(page, 'Cuaderno de notas');
  await page.getByRole('link', { name: /Carrito/ }).click();
}

test.beforeEach(async ({ page }) => {
  await iniciarSesion(page);
});

test('el contador del carrito sube al agregar', async ({ page }) => {
  await agregar(page, 'Mochila de viaje');
  await agregar(page, 'Cuaderno de notas');
  await expect(page.getByTestId('contador-carrito')).toHaveText('2');
});

test('el carrito muestra una fila por producto', async ({ page }) => {
  await llenarCarrito(page);
  await expect(page.getByRole('table').locator('tbody tr')).toHaveCount(2);
});

test('el total del carrito es correcto', async ({ page }) => {
  await llenarCarrito(page);
  await expect(page.getByTestId('total')).toHaveText('$597 MXN');
});

test('quitar un producto actualiza el carrito', async ({ page }) => {
  await agregar(page, 'Mochila de viaje');
  await page.getByRole('link', { name: /Carrito/ }).click();
  await page.getByRole('button', { name: 'Quitar' }).click();
  await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Finalizar compra' })).toBeHidden();
});

test('soft assertions: revisar varias cosas aunque una falle', async ({ page }) => {
  await expect.soft(page).toHaveTitle('Tienda QA | Productos');
  await expect.soft(page.getByTestId('contador-carrito')).toHaveText('0');
  await expect.soft(page.getByRole('article')).toHaveCount(6);
});

test('arreglar una prueba que no prueba nada', async ({ page }) => {
  await agregar(page, 'Mochila de viaje');
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});
