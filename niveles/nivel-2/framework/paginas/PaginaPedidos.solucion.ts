import type { Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';

export type Columna = 'Pedido' | 'Cliente' | 'Estado' | 'Total';

export class PaginaPedidos extends PaginaBase {
  readonly ruta = '/pedidos.html';

  get tabla(): Locator {
    return this.page.getByRole('table', { name: 'Pedidos' });
  }

  get filas(): Locator {
    return this.tabla.locator('tbody tr');
  }

  filaDePedido(id: number): Locator {
    return this.filas.filter({ has: this.page.getByRole('cell', { name: `#${id}`, exact: true }) });
  }

  async celda(fila: Locator, columna: Columna): Promise<Locator> {
    const encabezados = await this.tabla.getByRole('columnheader').allTextContents();
    const indice = encabezados.indexOf(columna);
    if (indice === -1) throw new Error(`La tabla no tiene la columna "${columna}"`);
    return fila.getByRole('cell').nth(indice);
  }

  async buscarCliente(texto: string): Promise<void> {
    await this.page.getByLabel('Buscar cliente').fill(texto);
  }

  async filtrarPorEstado(etiqueta: string): Promise<void> {
    await this.page.getByLabel('Estado').selectOption({ label: etiqueta });
  }

  get paginaActual(): Locator {
    return this.page.getByRole('navigation', { name: 'Paginación' }).getByText(/^Página \d+ de \d+$/);
  }

  async paginaSiguiente(): Promise<void> {
    await this.page.getByRole('button', { name: 'Siguiente' }).click();
  }

  get detalle(): Locator {
    return this.page.getByRole('dialog');
  }

  async verDetalle(id: number): Promise<Locator> {
    await this.filaDePedido(id).getByRole('button', { name: 'Ver detalle' }).click();
    return this.detalle;
  }
}
