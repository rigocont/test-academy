import type { Locator, Page } from '@playwright/test';

export type Seccion = 'Productos' | 'Pedidos' | 'Reportes' | 'Herramientas';

/**
 * Componente reutilizable: el encabezado aparece en todas las páginas con sesión.
 * Este archivo ya está completo. Úsalo como ejemplo de cómo se escribe un Page Object.
 */
export class Encabezado {
  readonly raiz: Locator;
  readonly contadorCarrito: Locator;
  readonly usuarioActual: Locator;

  constructor(private readonly page: Page) {
    this.raiz = page.getByRole('navigation', { name: 'Principal' });
    this.contadorCarrito = page.getByTestId('contador-carrito');
    this.usuarioActual = page.getByTestId('usuario-actual');
  }

  async irA(seccion: Seccion) {
    await this.raiz.getByRole('link', { name: seccion, exact: true }).click();
  }

  async irAlCarrito() {
    await this.raiz.getByRole('link', { name: /Carrito/ }).click();
  }

  async cerrarSesion() {
    await this.raiz.getByRole('button', { name: 'Cerrar sesión' }).click();
  }
}
