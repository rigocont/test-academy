import { test, expect, type Page } from '@playwright/test';
import { iniciarSesion, porResolver } from '../soporte';

// M1.8 Organizar pruebas
// Esta suite del checkout funciona, pero está desordenada: se repite el mismo setup
// en cada prueba y los nombres no dicen qué validan.
//
// Tu tarea:
//   1. Agrupa todo en un test.describe('Checkout', ...).
//   2. Mueve el setup repetido a un test.beforeEach.
//   3. Usa un test.describe anidado para las validaciones del formulario.
//   4. Renombra las pruebas para que digan qué esperan ("código postal de 4 dígitos muestra error").
//   5. Agrega la prueba que falta: apellido vacío.
//   npx playwright test m1.8

async function irAlCheckout(page: Page) {
  await iniciarSesion(page);
  await page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: 'Taza térmica' }) })
    .getByRole('button', { name: 'Agregar al carrito' })
    .click();
  await page.getByRole('link', { name: /Carrito/ }).click();
  await page.getByRole('link', { name: 'Finalizar compra' }).click();
}

test('prueba 1', async ({ page }) => {
  await irAlCheckout(page);
  await page.getByLabel('Nombre').fill('Ana');
  await page.getByLabel('Apellido').fill('López');
  await page.getByLabel('Código postal').fill('06600');
  await page.getByRole('button', { name: 'Confirmar pedido' }).click();
  await expect(page.getByRole('heading', { name: '¡Gracias por tu compra!' })).toBeVisible();
});

test('prueba 2', async ({ page }) => {
  await irAlCheckout(page);
  await page.getByLabel('Apellido').fill('López');
  await page.getByLabel('Código postal').fill('06600');
  await page.getByRole('button', { name: 'Confirmar pedido' }).click();
  await expect(page.getByRole('alert')).toHaveText('El nombre es obligatorio');
});

test('prueba 3', async ({ page }) => {
  await irAlCheckout(page);
  await page.getByLabel('Nombre').fill('Ana');
  await page.getByLabel('Apellido').fill('López');
  await page.getByLabel('Código postal').fill('0660');
  await page.getByRole('button', { name: 'Confirmar pedido' }).click();
  await expect(page.getByRole('alert')).toHaveText('El código postal debe tener 5 dígitos');
});

test('prueba 4', async ({ page }) => {
  porResolver('reorganiza este archivo siguiendo las instrucciones de arriba y agrega la prueba de apellido vacío');
});
