import { test, expect } from '../framework/fixtures';

// M2.3 Fixtures
// Mismas pruebas de M2.2, pero ahora piden los Page Objects como fixtures.
// Compara: sin `new`, sin beforeEach y sin login en cada prueba.
// Tu trabajo: completar paginaProductos, paginaCarrito y paginaCheckout en framework/fixtures.ts.
//   npx playwright test m2.3

test('el carrito suma cantidades y total', async ({ paginaProductos, paginaCarrito }) => {
  await paginaProductos.agregar('Taza térmica', 'Taza térmica', 'Cuaderno de notas');
  await paginaProductos.encabezado.irAlCarrito();
  await expect(paginaCarrito.filas).toHaveCount(2);
  await expect(paginaCarrito.total).toHaveText('$597 MXN');
});

test('checkout completo', async ({ paginaProductos, paginaCarrito, paginaCheckout }) => {
  await paginaProductos.agregar('Mochila de viaje');
  await paginaProductos.encabezado.irAlCarrito();
  await paginaCarrito.finalizarCompra();
  await paginaCheckout.confirmar({ nombre: 'Ana', apellido: 'López', cp: '06600' });
  await expect(paginaCheckout.confirmacion).toBeVisible();
});

test('la página de productos ya llega cargada', async ({ paginaProductos }) => {
  // Sin esperarCarga() aquí: el fixture ya lo hizo.
  await expect(paginaProductos.tarjetas).toHaveCount(6);
});

test.describe('con otro usuario', () => {
  // Las opciones de fixtures se cambian por grupo con test.use().
  test.use({ usuario: 'admin' });

  test('admin también puede comprar', async ({ paginaProductos }) => {
    await expect(paginaProductos.encabezado.usuarioActual).toHaveText('admin');
  });
});

test('el login sigue disponible como fixture', async ({ paginaLogin }) => {
  await paginaLogin.entrar('nadie', 'x');
  await expect(paginaLogin.mensajeError).toHaveText('Usuario o contraseña incorrectos');
});
