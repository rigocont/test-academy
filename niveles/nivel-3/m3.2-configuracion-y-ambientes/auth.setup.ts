import { test as setup, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';

// Proyecto "nivel-3-setup" (ver playwright.config.ts). Corre UNA vez antes de las pruebas del
// Nivel 3: inicia sesión por la UI y guarda cookies y localStorage en un archivo.
// Las pruebas que usan ese archivo arrancan con la sesión ya iniciada.
// Este archivo ya está completo.

setup('iniciar sesión como estandar', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('estandar');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/productos/);
  await page.context().storageState({ path: ESTADO_ESTANDAR });
});
