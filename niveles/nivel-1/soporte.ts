import { expect, type Page } from '@playwright/test';

/**
 * Marca una prueba del lab que todavía no resuelves.
 * Borra la llamada a porResolver() cuando escribas tu código.
 */
export function porResolver(instruccion: string): never {
  throw new Error(`Por resolver: ${instruccion}`);
}

/**
 * Inicia sesión en la tienda de práctica por la interfaz.
 * Se usa en los labs a partir de M1.3 para no repetir el login en cada prueba.
 * En el Nivel 2 esto se reemplaza por fixtures y storageState.
 */
export async function iniciarSesion(page: Page, usuario = 'estandar', contrasena = 'secreto123') {
  await page.goto('/');
  await page.getByLabel('Usuario').fill(usuario);
  await page.getByLabel('Contraseña').fill(contrasena);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/productos/);
}
