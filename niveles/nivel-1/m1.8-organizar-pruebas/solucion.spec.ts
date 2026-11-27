import { test, expect, type Page } from '@playwright/test';
import { iniciarSesion } from '../soporte';

async function llenarFormulario(page: Page, datos: { nombre?: string; apellido?: string; cp?: string }) {
  if (datos.nombre) await page.getByLabel('Nombre').fill(datos.nombre);
  if (datos.apellido) await page.getByLabel('Apellido').fill(datos.apellido);
  if (datos.cp) await page.getByLabel('Código postal').fill(datos.cp);
  await page.getByRole('button', { name: 'Confirmar pedido' }).click();
}

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await iniciarSesion(page);
    await page
      .getByRole('article')
      .filter({ has: page.getByRole('heading', { name: 'Taza térmica' }) })
      .getByRole('button', { name: 'Agregar al carrito' })
      .click();
    await page.getByRole('link', { name: /Carrito/ }).click();
    await page.getByRole('link', { name: 'Finalizar compra' }).click();
  });

  test('con datos válidos confirma el pedido y vacía el carrito', async ({ page }) => {
    await llenarFormulario(page, { nombre: 'Ana', apellido: 'López', cp: '06600' });
    await expect(page.getByRole('heading', { name: '¡Gracias por tu compra!' })).toBeVisible();
    await expect(page.getByTestId('numero-pedido')).toHaveText(/^QA-\d{6}$/);
    await expect(page.getByTestId('contador-carrito')).toHaveText('0');
  });

  test.describe('validaciones del formulario', () => {
    test('nombre vacío muestra error', async ({ page }) => {
      await llenarFormulario(page, { apellido: 'López', cp: '06600' });
      await expect(page.getByRole('alert')).toHaveText('El nombre es obligatorio');
    });

    test('apellido vacío muestra error', async ({ page }) => {
      await llenarFormulario(page, { nombre: 'Ana', cp: '06600' });
      await expect(page.getByRole('alert')).toHaveText('El apellido es obligatorio');
    });

    test('código postal de 4 dígitos muestra error', async ({ page }) => {
      await llenarFormulario(page, { nombre: 'Ana', apellido: 'López', cp: '0660' });
      await expect(page.getByRole('alert')).toHaveText('El código postal debe tener 5 dígitos');
    });
  });
});
