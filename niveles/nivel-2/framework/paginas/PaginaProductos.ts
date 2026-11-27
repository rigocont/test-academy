import { expect, type Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';
import { porResolver } from '../soporte';

// M2.2: completa este Page Object.

export class PaginaProductos extends PaginaBase {
  readonly ruta = '/productos.html';

  /** Todas las tarjetas de producto visibles (cada una es un <article>). */
  get tarjetas(): Locator {
    return porResolver('PaginaProductos.tarjetas');
  }

  /** La tarjeta del producto con ese nombre exacto. */
  tarjeta(nombre: string): Locator {
    return porResolver('PaginaProductos.tarjeta');
  }

  /** Espera a que termine "Cargando productos...". */
  async esperarCarga(): Promise<void> {
    porResolver('PaginaProductos.esperarCarga');
  }

  /** Agrega uno o varios productos. Si un nombre se repite, se agrega dos veces. */
  async agregar(...nombres: string[]): Promise<void> {
    porResolver('PaginaProductos.agregar');
  }

  async buscar(texto: string): Promise<void> {
    porResolver('PaginaProductos.buscar');
  }

  /** Recibe la etiqueta visible: "Electrónica", "Hogar"... */
  async filtrarPorCategoria(etiqueta: string): Promise<void> {
    porResolver('PaginaProductos.filtrarPorCategoria');
  }
}
