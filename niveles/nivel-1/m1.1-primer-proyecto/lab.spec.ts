import { test, expect } from '@playwright/test';
import { porResolver } from '../soporte';

// M1.1 Primer proyecto Playwright
// Las dos primeras pruebas ya están hechas: córrelas y léelas con calma.
//   npx playwright test m1.1
//   npx playwright test m1.1 --headed     (para ver el navegador)
//   npx playwright test m1.1 --ui         (modo UI)

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
  porResolver('ve a /productos.html sin iniciar sesión y valida que la URL termina en "/"');
});
