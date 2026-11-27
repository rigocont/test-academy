import { test, expect } from '@playwright/test';
import { porResolver } from '../soporte';

// M1.2 Anatomía de una prueba
// Automatiza estos casos de prueba del login. Usa la estructura Arrange-Act-Assert:
//   Arrange: ir a la página.   Act: llenar y enviar.   Assert: validar el resultado.
// Usuarios: estandar, bloqueado, lento. Contraseña: secreto123.
//   npx playwright test m1.2

test('login exitoso lleva a productos', async ({ page }) => {
  // Arrange
  await page.goto('/');
  // Act
  await page.getByLabel('Usuario').fill('estandar');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  // Assert
  await expect(page).toHaveURL(/productos/);
  await expect(page.getByTestId('usuario-actual')).toHaveText('estandar');
});

test('usuario bloqueado ve un mensaje de error', async ({ page }) => {
  porResolver('entra con "bloqueado" y valida el mensaje "Este usuario está bloqueado"');
});

test('contraseña incorrecta ve un mensaje de error', async ({ page }) => {
  porResolver('usa una contraseña equivocada y valida "Usuario o contraseña incorrectos"');
});

test('campos vacíos muestran que son obligatorios', async ({ page }) => {
  porResolver('da clic en Entrar sin llenar nada y valida "Usuario y contraseña son obligatorios"');
});

test('cerrar sesión regresa al login', async ({ page }) => {
  porResolver('inicia sesión, da clic en "Cerrar sesión" y valida que vuelves al login');
});
