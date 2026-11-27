import { test, expect, type Page } from '@playwright/test';
import { iniciarSesion, porResolver } from '../soporte';

// M1.4 Aserciones
// Usa web-first assertions: await expect(locator).toHaveText(...), toBeVisible(), toHaveCount()...
// Esperan solas hasta que se cumplen (o se acaba el tiempo). No uses expect(await locator.textContent()).
//   npx playwright test m1.4

async function agregar(page: Page, nombre: string) {
  await page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: nombre }) })
    .getByRole('button') // sin nombre: después del primer clic el botón dice "Agregado"
    .click();
}

test.beforeEach(async ({ page }) => {
  await iniciarSesion(page);
});

test('el contador del carrito sube al agregar', async ({ page }) => {
  porResolver('agrega 2 productos distintos y valida que el contador dice "2"');
});

test('el carrito muestra una fila por producto', async ({ page }) => {
  porResolver('agrega Taza térmica dos veces y Cuaderno de notas una vez, ve al carrito y valida que la tabla tiene 2 filas en el cuerpo');
});

test('el total del carrito es correcto', async ({ page }) => {
  // Taza térmica $249 × 2 + Cuaderno de notas $99 = $597
  porResolver('con los mismos productos, valida que el total dice "$597 MXN"');
});

test('quitar un producto actualiza el carrito', async ({ page }) => {
  porResolver('agrega 1 producto, quítalo en el carrito y valida "Tu carrito está vacío" y que "Finalizar compra" no se ve');
});

test('soft assertions: revisar varias cosas aunque una falle', async ({ page }) => {
  // expect.soft no detiene la prueba al fallar: reporta todas las diferencias al final.
  porResolver('en la página de productos valida con expect.soft el título, el contador en "0" y que hay 6 artículos');
});

test('arreglar una prueba que no prueba nada', async ({ page }) => {
  await agregar(page, 'Mochila de viaje');
  // Esta prueba siempre pasa: le falta await y la aserción no espera nada.
  // Además compara contra el texto equivocado. Corrígela para que falle si el contador no es "1".
  expect(page.getByTestId('contador-carrito')).toBeTruthy();
  porResolver('borra esta línea cuando corrijas la aserción de arriba');
});
