import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../framework/paginas/PaginaLogin';
import { PaginaProductos } from '../framework/paginas/PaginaProductos';
import { PaginaCarrito } from '../framework/paginas/PaginaCarrito';
import { PaginaCheckout } from '../framework/paginas/PaginaCheckout';

// M2.2 Page Object Model
// Estas pruebas YA ESTÁN ESCRITAS. Tu trabajo es completar los Page Objects de
// framework/paginas/ (PaginaLogin, PaginaProductos, PaginaCarrito, PaginaCheckout)
// hasta que todas pasen. Fíjate en lo que se gana: las pruebas no tienen ni un locator.
//   npx playwright test m2.2

test.describe('Login', () => {
  test('usuario bloqueado ve el error', async ({ page }) => {
    const login = new PaginaLogin(page);
    await login.abrir();
    await login.entrar('bloqueado');
    await expect(login.mensajeError).toHaveText('Este usuario está bloqueado');
  });

  test('usuario estándar llega a productos', async ({ page }) => {
    const login = new PaginaLogin(page);
    await login.abrir();
    await login.entrarComo('estandar');
    await expect(login.encabezado.usuarioActual).toHaveText('estandar');
  });
});

test.describe('Compra', () => {
  test.beforeEach(async ({ page }) => {
    const login = new PaginaLogin(page);
    await login.abrir();
    await login.entrarComo('estandar');
  });

  test('buscar y filtrar productos', async ({ page }) => {
    const productos = new PaginaProductos(page);
    await productos.esperarCarga();
    await expect(productos.tarjetas).toHaveCount(6);
    await productos.filtrarPorCategoria('Hogar');
    await expect(productos.tarjetas).toHaveCount(2);
    await productos.buscar('taza');
    await expect(productos.tarjetas).toHaveCount(1);
    await expect(productos.tarjeta('Taza térmica')).toBeVisible();
  });

  test('el carrito suma cantidades y total', async ({ page }) => {
    const productos = new PaginaProductos(page);
    await productos.agregar('Taza térmica', 'Taza térmica', 'Cuaderno de notas');
    await expect(productos.encabezado.contadorCarrito).toHaveText('3');

    await productos.encabezado.irAlCarrito();
    const carrito = new PaginaCarrito(page);
    await expect(carrito.filas).toHaveCount(2);
    await expect(carrito.fila('Taza térmica')).toContainText('2');
    await expect(carrito.total).toHaveText('$597 MXN');

    await carrito.quitar('Taza térmica');
    await expect(carrito.filas).toHaveCount(1);
    await expect(carrito.total).toHaveText('$99 MXN');
  });

  test('checkout completo', async ({ page }) => {
    const productos = new PaginaProductos(page);
    await productos.agregar('Mochila de viaje');
    await productos.encabezado.irAlCarrito();
    await new PaginaCarrito(page).finalizarCompra();

    const checkout = new PaginaCheckout(page);
    await checkout.confirmar({ nombre: 'Ana', apellido: 'López', cp: '0660' });
    await expect(checkout.error).toHaveText('El código postal debe tener 5 dígitos');
    await checkout.confirmar({ cp: '06600' });
    await expect(checkout.confirmacion).toBeVisible();
    await expect(checkout.numeroPedido).toHaveText(/^QA-\d{6}$/);
  });

  test('vaciar el carrito muestra el mensaje', async ({ page }) => {
    const productos = new PaginaProductos(page);
    await productos.agregar('Cuaderno de notas');
    await productos.encabezado.irAlCarrito();
    const carrito = new PaginaCarrito(page);
    await carrito.quitar('Cuaderno de notas');
    await expect(carrito.mensajeVacio).toBeVisible();
  });
});
