import { test, expect } from '@playwright/test';
import { iniciarSesion, porResolver } from '../soporte';

// M1.5 Esperas
// Playwright espera solo (auto-waiting) antes de cada acción y en cada web-first assertion.
// Regla del curso: nunca uses page.waitForTimeout() en una prueba entregada.
//   npx playwright test m1.5 --repeat-each=5     (repite cada prueba para encontrar las inestables)

test('los productos cargan después de una llamada lenta a la API', async ({ page }) => {
  await iniciarSesion(page);
  porResolver('valida que "Cargando productos..." desaparece y que aparecen 6 artículos, sin esperas fijas');
});

test('el usuario "lento" tarda en entrar', async ({ page }) => {
  // El usuario "lento" tarda 1.5 s en redirigir.
  porResolver('inicia sesión a mano con "lento" y valida que termina en la página de productos');
});

test('PRUEBA INESTABLE: el reporte de ventas', async ({ page }) => {
  await iniciarSesion(page);
  await page.getByRole('link', { name: 'Reportes' }).click();
  await page.getByRole('button', { name: 'Generar reporte de ventas' }).click();

  // El reporte tarda entre 1 y 3 segundos. Esta espera fija pasa a veces y falla otras.
  await page.waitForTimeout(1500);
  expect(await page.getByRole('status').textContent()).toBe('Reporte listo');

  porResolver('reemplaza las dos líneas de arriba por una web-first assertion y corre con --repeat-each=5');
});

test('esperar una respuesta de red', async ({ page }) => {
  await iniciarSesion(page);
  // A veces quieres validar la llamada a la API que hace la página.
  porResolver('recarga la página esperando la respuesta de /api/productos con page.waitForResponse y valida que su status es 200');
});
