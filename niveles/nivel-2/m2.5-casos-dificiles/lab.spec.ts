import { test, expect } from '../framework/fixtures';
import { porResolver } from '../framework/soporte';

// M2.5 Sincronización y casos difíciles
// Diálogos del navegador, pestañas nuevas, iframes, subir y descargar archivos.
// Todo está en la página Herramientas de la tienda.
//   npx playwright test m2.5

test.beforeEach(async ({ paginaProductos }) => {
  await paginaProductos.encabezado.irA('Herramientas');
});

test('ejemplo: aceptar un alert', async ({ page }) => {
  // Playwright cierra los diálogos solo (los rechaza). Para revisarlos o aceptarlos,
  // registra el manejador ANTES de la acción que abre el diálogo.
  page.once('dialog', async (dialogo) => {
    expect(dialogo.type()).toBe('alert');
    expect(dialogo.message()).toBe('Este es un aviso de prueba');
    await dialogo.accept();
  });
  await page.getByRole('button', { name: 'Mostrar aviso' }).click();
  await expect(page.getByRole('status').first()).toHaveText('Aviso cerrado');
});

test('confirm: aceptar vacía el carrito', async ({ page }) => {
  porResolver('acepta el confirm de "Vaciar carrito" y valida "Carrito vaciado"');
});

test('confirm: cancelar conserva el carrito', async ({ page }) => {
  porResolver('rechaza el confirm (dismiss) y valida "Se conservó el carrito"');
});

test('prompt: escribir un valor', async ({ page }) => {
  porResolver('responde el prompt de "Renombrar lista" con "Regalos" y valida "Lista renombrada a \\"Regalos\\""');
});

test('pestaña nueva: el manual', async ({ page }) => {
  porResolver('espera el evento "popup" al dar clic en "Abrir manual de usuario" y valida el título y la versión 2.1');
});

test('iframe: enviar una consulta a soporte', async ({ page }) => {
  porResolver('usa page.frameLocator o getByTitle("Soporte").contentFrame() para escribir y enviar la consulta "Hola"');
});

test('subir un archivo', async ({ page }) => {
  porResolver('sube framework/datos/productos.csv con setInputFiles y valida "productos.csv: 6 productos cargados"');
});

test('descargar un archivo', async ({ page }) => {
  porResolver('espera el evento "download", valida el nombre inventario.csv y que su contenido tiene 7 líneas');
});
