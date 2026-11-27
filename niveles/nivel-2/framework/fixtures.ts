import { test as base } from '@playwright/test';
import { PaginaLogin } from './paginas/PaginaLogin';
import { PaginaProductos } from './paginas/PaginaProductos';
import { PaginaCarrito } from './paginas/PaginaCarrito';
import { PaginaCheckout } from './paginas/PaginaCheckout';
import { PaginaPedidos } from './paginas/PaginaPedidos';
import { ClientePedidos } from './clientes/ClientePedidos';
import { obtenerToken } from './clientes/ClienteApi';
import { porResolver } from './soporte';

// Fixtures del framework. Las pruebas importan `test` y `expect` de este archivo
// en lugar de '@playwright/test', y piden por nombre lo que necesitan:
//
//   test('agregar al carrito', async ({ paginaProductos }) => { ... });

type Fixtures = {
  /** Usuario con el que se inicia sesión. Se cambia con test.use({ usuario: 'admin' }). */
  usuario: string;
  /** Página de login ya abierta. */
  paginaLogin: PaginaLogin;
  /** M2.3: sesión iniciada por la interfaz y página de productos cargada. */
  paginaProductos: PaginaProductos;
  /** M2.3: Page Object del carrito (no navega). */
  paginaCarrito: PaginaCarrito;
  /** M2.3: Page Object del checkout (no navega). */
  paginaCheckout: PaginaCheckout;
  /** Token de la API para `usuario`. */
  token: string;
  /** Cliente de la API de pedidos con el token ya puesto (lo completas en M2.12). */
  pedidos: ClientePedidos;
  /** M2.14: sesión iniciada por API, sin pasar por la pantalla de login, y página de pedidos abierta. */
  paginaPedidos: PaginaPedidos;
};

export const test = base.extend<Fixtures>({
  usuario: ['estandar', { option: true }],

  // Ejemplo completo: crea el Page Object, lo prepara y se lo entrega a la prueba con use().
  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.abrir();
    await use(paginaLogin);
  },

  paginaProductos: async ({ page, paginaLogin, usuario }, use) => {
    porResolver('fixture paginaProductos: entra como `usuario`, espera la carga y entrega la página');
  },

  paginaCarrito: async ({ page }, use) => {
    porResolver('fixture paginaCarrito');
  },

  paginaCheckout: async ({ page }, use) => {
    porResolver('fixture paginaCheckout');
  },

  token: async ({ request, usuario }, use) => {
    await use(await obtenerToken(request, usuario));
  },

  pedidos: async ({ request, token }, use) => {
    await use(new ClientePedidos(request, token));
  },

  paginaPedidos: async ({ page, usuario, token }, use) => {
    porResolver(
      'fixture paginaPedidos: guarda `usuario` y `token` en localStorage con page.addInitScript() antes de abrir la página',
    );
  },
});

export { expect } from '@playwright/test';
