import type { Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';
import { porResolver } from '../soporte';

// M2.2: completa este Page Object.

export interface DatosEnvio {
  nombre?: string;
  apellido?: string;
  cp?: string;
}

export class PaginaCheckout extends PaginaBase {
  readonly ruta = '/checkout.html';

  get error(): Locator {
    return porResolver('PaginaCheckout.error');
  }

  /** El título "¡Gracias por tu compra!". */
  get confirmacion(): Locator {
    return porResolver('PaginaCheckout.confirmacion');
  }

  get numeroPedido(): Locator {
    return porResolver('PaginaCheckout.numeroPedido');
  }

  /** Llena solo los campos que vienen en `datos` y da clic en "Confirmar pedido". */
  async confirmar(datos: DatosEnvio): Promise<void> {
    porResolver('PaginaCheckout.confirmar');
  }
}
