import { test, expect } from '@playwright/test';
import { iniciarSesion } from '../soporte';

test('los productos cargan después de una llamada lenta a la API', async ({ page }) => {
  await iniciarSesion(page);
  await expect(page.getByText('Cargando productos...')).toBeHidden();
  await expect(page.getByRole('article')).toHaveCount(6);
});

test('el usuario "lento" tarda en entrar', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('lento');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/productos/);
});

test('PRUEBA INESTABLE: el reporte de ventas', async ({ page }) => {
  await iniciarSesion(page);
  await page.getByRole('link', { name: 'Reportes' }).click();
  await page.getByRole('button', { name: 'Generar reporte de ventas' }).click();
  await expect(page.getByRole('status')).toHaveText('Reporte listo');
});

test('esperar una respuesta de red', async ({ page }) => {
  await iniciarSesion(page);
  const respuestaPromesa = page.waitForResponse('**/api/productos');
  await page.reload();
  const respuesta = await respuestaPromesa;
  expect(respuesta.status()).toBe(200);
});
