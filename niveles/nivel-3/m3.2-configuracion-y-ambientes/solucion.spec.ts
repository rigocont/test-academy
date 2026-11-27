import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';

test.use({ storageState: ESTADO_ESTANDAR });

test('arranca con la sesión iniciada', async ({ page }) => {
  await page.goto('/productos.html');
  await expect(page.getByTestId('usuario-actual')).toHaveText('estandar');
});

test('la sesión incluye el token de la API', async ({ page }) => {
  await page.goto('/pedidos.html');
  await expect(page.getByRole('table', { name: 'Pedidos' }).locator('tbody tr').first()).toBeVisible();
});

test.describe('sin sesión', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('productos sin sesión regresa al login', async ({ page }) => {
    await page.goto('/productos.html');
    await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
  });
});
