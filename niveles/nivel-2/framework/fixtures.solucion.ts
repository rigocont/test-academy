import { test as base } from '@playwright/test';
import { PaginaLogin } from './paginas/PaginaLogin';
import { PaginaProductos } from './paginas/PaginaProductos';
import { PaginaCarrito } from './paginas/PaginaCarrito';
import { PaginaCheckout } from './paginas/PaginaCheckout';
import { PaginaPedidos } from './paginas/PaginaPedidos';
import { ClientePedidos } from './clientes/ClientePedidos';
import { obtenerToken } from './clientes/ClienteApi';

type Fixtures = {
  usuario: string;
  paginaLogin: PaginaLogin;
  paginaProductos: PaginaProductos;
  paginaCarrito: PaginaCarrito;
  paginaCheckout: PaginaCheckout;
  token: string;
  pedidos: ClientePedidos;
  paginaPedidos: PaginaPedidos;
};

export const test = base.extend<Fixtures>({
  usuario: ['estandar', { option: true }],

  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.abrir();
    await use(paginaLogin);
  },

  paginaProductos: async ({ page, paginaLogin, usuario }, use) => {
    await paginaLogin.entrarComo(usuario);
    const paginaProductos = new PaginaProductos(page);
    await paginaProductos.esperarCarga();
    await use(paginaProductos);
  },

  paginaCarrito: async ({ page }, use) => {
    await use(new PaginaCarrito(page));
  },

  paginaCheckout: async ({ page }, use) => {
    await use(new PaginaCheckout(page));
  },

  token: async ({ request, usuario }, use) => {
    await use(await obtenerToken(request, usuario));
  },

  pedidos: async ({ request, token }, use) => {
    await use(new ClientePedidos(request, token));
  },

  paginaPedidos: async ({ page, usuario, token }, use) => {
    // addInitScript corre en el navegador antes de que cargue cualquier página.
    await page.addInitScript(
      ([u, t]) => {
        localStorage.setItem('usuario', u);
        localStorage.setItem('token', t);
      },
      [usuario, token],
    );
    const paginaPedidos = new PaginaPedidos(page);
    await paginaPedidos.abrir();
    await use(paginaPedidos);
  },
});

export { expect } from '@playwright/test';
