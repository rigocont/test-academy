import type { Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';
import { porResolver } from '../soporte';

// M2.2: completa este Page Object.

export class PaginaCarrito extends PaginaBase {
  readonly ruta = '/carrito.html';

  /** Las filas del cuerpo de la tabla (sin el encabezado). */
  get filas(): Locator {
    return porResolver('PaginaCarrito.filas');
  }

  /** La fila del producto con ese nombre. */
  fila(nombre: string): Locator {
    return porResolver('PaginaCarrito.fila');
  }

  get total(): Locator {
    return porResolver('PaginaCarrito.total');
  }

  get mensajeVacio(): Locator {
    return porResolver('PaginaCarrito.mensajeVacio');
  }

  async quitar(nombre: string): Promise<void> {
    porResolver('PaginaCarrito.quitar');
  }

  async finalizarCompra(): Promise<void> {
    porResolver('PaginaCarrito.finalizarCompra');
  }
}
