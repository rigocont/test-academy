import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test, expect } from '../framework/fixtures';

const CSV = join(import.meta.dirname, '..', 'framework', 'datos', 'productos.csv');

test.beforeEach(async ({ paginaProductos }) => {
  await paginaProductos.encabezado.irA('Herramientas');
});

const resultado = (page: import('@playwright/test').Page) =>
  page.getByRole('region', { name: 'Diálogos del navegador' }).getByRole('status');

test('ejemplo: aceptar un alert', async ({ page }) => {
  page.once('dialog', async (dialogo) => {
    expect(dialogo.type()).toBe('alert');
    expect(dialogo.message()).toBe('Este es un aviso de prueba');
    await dialogo.accept();
  });
  await page.getByRole('button', { name: 'Mostrar aviso' }).click();
  await expect(page.getByRole('status').first()).toHaveText('Aviso cerrado');
});

test('confirm: aceptar vacía el carrito', async ({ page }) => {
  page.once('dialog', (dialogo) => dialogo.accept());
  await page.getByRole('button', { name: 'Vaciar carrito' }).click();
  await expect(resultado(page)).toHaveText('Carrito vaciado');
});

test('confirm: cancelar conserva el carrito', async ({ page }) => {
  page.once('dialog', (dialogo) => dialogo.dismiss());
  await page.getByRole('button', { name: 'Vaciar carrito' }).click();
  await expect(resultado(page)).toHaveText('Se conservó el carrito');
});

test('prompt: escribir un valor', async ({ page }) => {
  page.once('dialog', async (dialogo) => {
    expect(dialogo.type()).toBe('prompt');
    expect(dialogo.defaultValue()).toBe('Mi lista');
    await dialogo.accept('Regalos');
  });
  await page.getByRole('button', { name: 'Renombrar lista' }).click();
  await expect(resultado(page)).toHaveText('Lista renombrada a "Regalos"');
});

test('pestaña nueva: el manual', async ({ page }) => {
  const popupPromesa = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Abrir manual de usuario' }).click();
  const manual = await popupPromesa;
  await expect(manual).toHaveTitle('Tienda QA | Manual de usuario');
  await expect(manual.getByText('Versión del manual: 2.1')).toBeVisible();
});

test('iframe: enviar una consulta a soporte', async ({ page }) => {
  const soporte = page.getByTitle('Soporte').contentFrame();
  await soporte.getByLabel('Tu consulta').fill('Hola');
  await soporte.getByRole('button', { name: 'Enviar consulta' }).click();
  await expect(soporte.getByRole('status')).toContainText('Recibimos tu consulta: "Hola"');
});

test('subir un archivo', async ({ page }) => {
  await page.getByLabel('Subir archivo de productos').setInputFiles(CSV);
  await expect(page.getByText('productos.csv: 6 productos cargados')).toBeVisible();
});

test('descargar un archivo', async ({ page }) => {
  const descargaPromesa = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descargar inventario' }).click();
  const descarga = await descargaPromesa;
  expect(descarga.suggestedFilename()).toBe('inventario.csv');
  const contenido = await readFile(await descarga.path(), 'utf-8');
  expect(contenido.trim().split('\n')).toHaveLength(7);
  expect(contenido).toContain('4,Taza térmica,249,hogar');
});
