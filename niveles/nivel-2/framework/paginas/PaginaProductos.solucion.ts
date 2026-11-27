import { expect, type Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';

export class PaginaProductos extends PaginaBase {
  readonly ruta = '/productos.html';

  get tarjetas(): Locator {
    return this.page.getByRole('article');
  }

  tarjeta(nombre: string): Locator {
    return this.tarjetas.filter({ has: this.page.getByRole('heading', { name: nombre, exact: true }) });
  }

  async esperarCarga(): Promise<void> {
    await expect(this.page.getByText('Cargando productos...')).toBeHidden();
  }

  async agregar(...nombres: string[]): Promise<void> {
    for (const nombre of nombres) {
      // Sin nombre de botón: después del primer clic dice "Agregado".
      await this.tarjeta(nombre).getByRole('button').click();
    }
  }

  async buscar(texto: string): Promise<void> {
    await this.page.getByLabel('Buscar producto').fill(texto);
  }

  async filtrarPorCategoria(etiqueta: string): Promise<void> {
    await this.page.getByLabel('Categoría').selectOption({ label: etiqueta });
  }
}
