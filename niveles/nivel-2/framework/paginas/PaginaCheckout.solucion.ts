import type { Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';

export interface DatosEnvio {
  nombre?: string;
  apellido?: string;
  cp?: string;
}

export class PaginaCheckout extends PaginaBase {
  readonly ruta = '/checkout.html';

  get error(): Locator {
    return this.page.getByRole('alert');
  }

  get confirmacion(): Locator {
    return this.page.getByRole('heading', { name: '¡Gracias por tu compra!' });
  }

  get numeroPedido(): Locator {
    return this.page.getByTestId('numero-pedido');
  }

  async confirmar(datos: DatosEnvio): Promise<void> {
    if (datos.nombre !== undefined) await this.page.getByLabel('Nombre').fill(datos.nombre);
    if (datos.apellido !== undefined) await this.page.getByLabel('Apellido').fill(datos.apellido);
    if (datos.cp !== undefined) await this.page.getByLabel('Código postal').fill(datos.cp);
    await this.page.getByRole('button', { name: 'Confirmar pedido' }).click();
  }
}
