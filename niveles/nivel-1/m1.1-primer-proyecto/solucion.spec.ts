import { test, expect } from '@playwright/test';

test('la página de login abre', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Tienda QA | Iniciar sesión');
});

test('el login muestra el formulario', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
  await expect(page.getByLabel('Usuario')).toBeVisible();
  await expect(page.getByLabel('Contraseña')).toBeVisible();
});

test('TODO: la página de productos sin sesión regresa al login', async ({ page }) => {
  await page.goto('/productos.html');
  await expect(page).toHaveURL(/\/$/);
});
