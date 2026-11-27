import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';

test.use({ storageState: ESTADO_ESTANDAR });

const MENSAJE_ERROR = 'No pudimos cargar los productos';

test('muestra un mensaje si la API responde 500', async ({ page }) => {
  await page.route('**/api/productos', (route) => route.fulfill({ status: 500, json: { error: 'falla' } }));
  await page.goto('/productos.html');
  await expect(page.getByRole('alert')).toContainText(MENSAJE_ERROR);
});

test('muestra los productos que devuelve la API', async ({ page }) => {
  await page.route('**/api/productos', (route) =>
    route.fulfill({ json: [{ id: 99, nombre: 'Producto simulado', precio: 10, categoria: 'hogar' }] }),
  );
  await page.goto('/productos.html');
  await expect(page.locator('article')).toHaveCount(1);
  await expect(page.locator('article h2')).toHaveText('Producto simulado');
});

test('modifica la respuesta real', async ({ page }) => {
  await page.route('**/api/productos', async (route) => {
    const response = await route.fetch();
    const productos = await response.json();
    productos[0].precio = 1;
    await route.fulfill({ response, json: productos });
  });
  await page.goto('/productos.html');
  await expect(page.getByTestId('producto-1')).toContainText('$1 MXN');
});

test('muestra "Cargando" mientras la API tarda', async ({ page }) => {
  await page.route('**/api/productos', async (route) => {
    await new Promise((listo) => setTimeout(listo, 1500));
    await route.continue();
  });
  await page.goto('/productos.html');
  await expect(page.getByText('Cargando productos...')).toBeVisible();
  await expect(page.locator('article')).toHaveCount(6);
  await expect(page.getByText('Cargando productos...')).toBeHidden();
});

test('muestra un mensaje si se cae la red', async ({ page }) => {
  await page.route('**/api/productos', (route) => route.abort('failed'));
  await page.goto('/productos.html');
  await expect(page.getByRole('alert')).toContainText(MENSAJE_ERROR);
});
