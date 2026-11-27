import { test, expect } from '../framework/fixtures';

// Causas:
// 1. Strict mode violation: hay 6 botones "Agregar al carrito". Hay que elegir el de un producto.
// 2. La prueba asumió mal el formato: el total incluye la moneda ("$498 MXN"). Error de la prueba.
// 3. Se hizo `await` de waitForResponse ANTES de reload(): la prueba se queda esperando una respuesta
//    que nunca llega porque la recarga todavía no ocurre. Hay que guardar la promesa, recargar y después esperar.
// 4. Playwright rechaza los diálogos que nadie maneja: el confirm se canceló. Falta aceptar el diálogo.
// 5. El formulario está dentro de un iframe: hay que buscar dentro del frame, no en la página.

test.use({ actionTimeout: 5_000 });

test('1. agregar un producto al carrito', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Usuario').fill('estandar');
  await page.getByLabel('Contraseña').fill('secreto123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: 'Taza térmica' }) })
    .getByRole('button', { name: 'Agregar al carrito' })
    .click();
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});

test('2. el total de dos tazas', async ({ paginaProductos, paginaCarrito }) => {
  await paginaProductos.agregar('Taza térmica', 'Taza térmica');
  await paginaProductos.encabezado.irAlCarrito();
  await expect(paginaCarrito.total).toHaveText('$498 MXN');
});

test('3. la página de productos llama a la API', async ({ page, paginaProductos }) => {
  const respuestaPromesa = page.waitForResponse('**/api/productos', { timeout: 5_000 });
  await page.reload();
  const respuesta = await respuestaPromesa;
  expect(respuesta.ok()).toBe(true);
});

test('4. vaciar el carrito desde Herramientas', async ({ page, paginaProductos }) => {
  await paginaProductos.agregar('Cuaderno de notas');
  await paginaProductos.encabezado.irA('Herramientas');
  page.once('dialog', (dialogo) => dialogo.accept());
  await page.getByRole('button', { name: 'Vaciar carrito' }).click();
  await expect(page.getByText('Carrito vaciado')).toBeVisible();
  await expect(paginaProductos.encabezado.contadorCarrito).toHaveText('0');
});

test('5. enviar una consulta a soporte', async ({ page, paginaProductos }) => {
  await paginaProductos.encabezado.irA('Herramientas');
  const soporte = page.getByTitle('Soporte').contentFrame();
  await soporte.getByLabel('Tu consulta').fill('No llega mi pedido');
  await soporte.getByRole('button', { name: 'Enviar consulta' }).click();
  await expect(soporte.getByText(/Recibimos tu consulta/)).toBeVisible();
});
