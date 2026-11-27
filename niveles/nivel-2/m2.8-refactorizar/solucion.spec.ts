import { test, expect } from '../framework/fixtures';

// Code smells del original y cómo se resolvieron:
// - Nombres "test1"/"test2": no dicen qué validan → nombres que describen el comportamiento.
// - Una prueba gigante que valida carrito, total y checkout → tres pruebas independientes.
// - Login copiado en cada prueba → fixture paginaProductos.
// - URL armada a mano → baseURL (la usan los Page Objects).
// - waitForTimeout → web-first assertions y esperarCarga() del fixture.
// - nth-child y selectores CSS de estructura → Page Objects con locators por rol y nombre.
// - expect(await x.textContent()) → expect(locator).toHaveText(), que espera.
// - Datos mágicos ("ul li:nth-child(4)" era la taza) → nombres de producto explícitos.

test.describe('Carrito', () => {
  test('agregar productos suma el contador', async ({ paginaProductos }) => {
    await paginaProductos.agregar('Taza térmica', 'Taza térmica', 'Cuaderno de notas');
    await expect(paginaProductos.encabezado.contadorCarrito).toHaveText('3');
  });

  test('agrupa por producto y calcula el total', async ({ paginaProductos, paginaCarrito }) => {
    await paginaProductos.agregar('Taza térmica', 'Taza térmica', 'Cuaderno de notas');
    await paginaProductos.encabezado.irAlCarrito();
    await expect(paginaCarrito.filas).toHaveCount(2);
    await expect(paginaCarrito.total).toHaveText('$597 MXN');
  });
});

test.describe('Checkout', () => {
  test.beforeEach(async ({ paginaProductos, paginaCarrito }) => {
    await paginaProductos.agregar('Taza térmica');
    await paginaProductos.encabezado.irAlCarrito();
    await paginaCarrito.finalizarCompra();
  });

  test('código postal de 3 dígitos muestra error', async ({ paginaCheckout }) => {
    await paginaCheckout.confirmar({ nombre: 'Ana', apellido: 'López', cp: '123' });
    await expect(paginaCheckout.error).toHaveText('El código postal debe tener 5 dígitos');
  });

  test('con datos válidos confirma el pedido', async ({ paginaCheckout }) => {
    await paginaCheckout.confirmar({ nombre: 'Ana', apellido: 'López', cp: '06600' });
    await expect(paginaCheckout.confirmacion).toBeVisible();
  });
});

test.describe('Catálogo', () => {
  test('filtrar por Electrónica muestra 2 productos', async ({ paginaProductos }) => {
    await paginaProductos.filtrarPorCategoria('Electrónica');
    await expect(paginaProductos.tarjetas).toHaveCount(2);
  });

  test('una búsqueda sin coincidencias muestra el mensaje', async ({ page, paginaProductos }) => {
    await paginaProductos.buscar('xyz');
    await expect(page.getByText('No hay productos que coincidan')).toBeVisible();
  });
});
