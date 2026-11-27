import { test, expect } from '@playwright/test';
import { iniciarSesion, porResolver } from '../soporte';

// M1.3 Locators
// Orden de preferencia: getByRole > getByLabel / getByText > getByTestId > CSS > XPath.
//   npx playwright test m1.3

test.beforeEach(async ({ page }) => {
  await iniciarSesion(page);
});

test('ejemplo: encontrar un producto por su nombre y agregarlo', async ({ page }) => {
  // Un producto es un <article>. Filtramos el que contiene el título "Taza térmica"
  // y dentro de él buscamos su botón. Así no dependemos del orden de la lista.
  const taza = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Taza térmica' }) });
  await taza.getByRole('button', { name: 'Agregar al carrito' }).click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});

test('getByLabel: buscar un producto', async ({ page }) => {
  porResolver('escribe "teclado" en "Buscar producto" y valida que solo queda 1 artículo visible');
});

test('getByRole con nombre: agregar los audífonos', async ({ page }) => {
  porResolver('agrega "Audífonos inalámbricos" igual que en el ejemplo y valida que su botón dice "Agregado"');
});

test('selectOption: filtrar por categoría', async ({ page }) => {
  porResolver('elige "Electrónica" en "Categoría" y valida que hay 2 artículos');
});

test('getByText: mensaje sin resultados', async ({ page }) => {
  porResolver('busca "bicicleta" y valida que se ve "No hay productos que coincidan"');
});

test('CSS y XPath: el mismo elemento de dos formas', async ({ page }) => {
  // A veces no hay otra opción, por eso hay que saberlos leer.
  porResolver('valida el precio de la mochila con un locator CSS y luego con uno XPath. Ambos deben tener "$899"');
});

test('reescribir un locator frágil', async ({ page }) => {
  // Este locator depende del orden y la estructura del HTML: se rompe si cambia el diseño.
  // await page.locator('ul > li:nth-child(4) > article > button').click();
  porResolver('reescribe la línea de arriba con getByRole y filter para agregar la Taza térmica');
});
