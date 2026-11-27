import { test, expect } from '@playwright/test';

test('login exitoso lleva a productos', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('estandar');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/productos/);
  await expect(page.getByTestId('usuario-actual')).toHaveText('estandar');
});

test('usuario bloqueado ve un mensaje de error', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('bloqueado');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('alert')).toHaveText('Este usuario está bloqueado');
  await expect(page).not.toHaveURL(/productos/);
});

test('contraseña incorrecta ve un mensaje de error', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('estandar');
  await page.getByLabel('Contraseña').fill('equivocada');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('alert')).toHaveText('Usuario o contraseña incorrectos');
});

test('campos vacíos muestran que son obligatorios', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('alert')).toHaveText('Usuario y contraseña son obligatorios');
});

test('cerrar sesión regresa al login', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('estandar');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
  await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
});
