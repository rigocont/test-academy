import { test, expect } from '../framework/fixtures';

// M2.6 Excepciones y depuración
// Las 5 pruebas de este archivo FALLAN y cada una tiene un error distinto.
// No las corrijas a ojo: encuentra la causa con las herramientas y escríbela en tu PR.
//
//   npx playwright test m2.6                      → lee el error de cada una
//   npx playwright show-trace test-results/.../trace.zip
//   npx playwright test m2.6 -g "carrito" --debug → paso a paso
//
// Para cada prueba anota: qué dice el error, qué viste en el trace, cuál era la causa,
// y clasifícala: ¿error de la prueba, de datos, de sincronización o bug de la app?

// Las acciones fallan a los 5 s en lugar de esperar todo el timeout de la prueba.
test.use({ actionTimeout: 5_000 });

test('1. agregar un producto al carrito', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('estandar');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});

test('2. el total de dos tazas', async ({ paginaProductos, paginaCarrito }) => {
  await paginaProductos.agregar('Taza térmica', 'Taza térmica');
  await paginaProductos.encabezado.irAlCarrito();
  await expect(paginaCarrito.total).toHaveText('$498');
});

test('3. la página de productos llama a la API', async ({ page, paginaProductos }) => {
  const respuesta = await page.waitForResponse('**/api/productos', { timeout: 5_000 });
  await page.reload();
  expect(respuesta.ok()).toBe(true);
});

test('4. vaciar el carrito desde Herramientas', async ({ page, paginaProductos }) => {
  await paginaProductos.agregar('Cuaderno de notas');
  await paginaProductos.encabezado.irA('Herramientas');
  await page.getByRole('button', { name: 'Vaciar carrito' }).click();
  await expect(page.getByText('Carrito vaciado')).toBeVisible();
  await expect(paginaProductos.encabezado.contadorCarrito).toHaveText('0');
});

test('5. enviar una consulta a soporte', async ({ page, paginaProductos }) => {
  await paginaProductos.encabezado.irA('Herramientas');
  await page.getByLabel('Tu consulta').fill('No llega mi pedido');
  await page.getByRole('button', { name: 'Enviar consulta' }).click();
  await expect(page.getByText(/Recibimos tu consulta/)).toBeVisible();
});
