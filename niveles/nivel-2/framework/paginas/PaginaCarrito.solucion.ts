import type { Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';

export class PaginaCarrito extends PaginaBase {
  readonly ruta = '/carrito.html';

  get filas(): Locator {
    return this.page.getByRole('table', { name: 'Productos en el carrito' }).locator('tbody tr');
  }

  fila(nombre: string): Locator {
    return this.filas.filter({ has: this.page.getByRole('cell', { name: nombre, exact: true }) });
  }

  get total(): Locator {
    return this.page.getByTestId('total');
  }

  get mensajeVacio(): Locator {
    return this.page.getByText('Tu carrito está vacío');
  }

  async quitar(nombre: string): Promise<void> {
    await this.fila(nombre).getByRole('button', { name: 'Quitar' }).click();
  }

  async finalizarCompra(): Promise<void> {
    await this.page.getByRole('link', { name: 'Finalizar compra' }).click();
  }
}
