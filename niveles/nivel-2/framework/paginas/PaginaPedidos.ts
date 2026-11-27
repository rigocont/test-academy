import type { Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';
import { porResolver } from '../soporte';

// M2.4: completa este Page Object. Practicas locators en tablas dinámicas y diálogos.

export type Columna = 'Pedido' | 'Cliente' | 'Estado' | 'Total';

export class PaginaPedidos extends PaginaBase {
  readonly ruta = '/pedidos.html';

  get tabla(): Locator {
    return porResolver('PaginaPedidos.tabla');
  }

  /** Filas del cuerpo de la tabla. */
  get filas(): Locator {
    return porResolver('PaginaPedidos.filas');
  }

  /** La fila cuya celda "Pedido" es exactamente "#<id>". Cuidado: "#1" no debe encontrar "#12". */
  filaDePedido(id: number): Locator {
    return porResolver('PaginaPedidos.filaDePedido');
  }

  /**
   * La celda de una columna dentro de una fila.
   * No escribas la posición de la columna a mano: calcúlala leyendo los encabezados de la tabla,
   * así la prueba sigue funcionando si alguien cambia el orden de las columnas.
   */
  async celda(fila: Locator, columna: Columna): Promise<Locator> {
    return porResolver('PaginaPedidos.celda');
  }

  async buscarCliente(texto: string): Promise<void> {
    porResolver('PaginaPedidos.buscarCliente');
  }

  /** Recibe la etiqueta visible: "Pendiente", "Pagado"... */
  async filtrarPorEstado(etiqueta: string): Promise<void> {
    porResolver('PaginaPedidos.filtrarPorEstado');
  }

  /** El texto "Página X de Y". */
  get paginaActual(): Locator {
    return porResolver('PaginaPedidos.paginaActual');
  }

  async paginaSiguiente(): Promise<void> {
    porResolver('PaginaPedidos.paginaSiguiente');
  }

  /** El diálogo de detalle (role="dialog"). */
  get detalle(): Locator {
    return porResolver('PaginaPedidos.detalle');
  }

  /** Da clic en "Ver detalle" de ese pedido y devuelve el diálogo. */
  async verDetalle(id: number): Promise<Locator> {
    return porResolver('PaginaPedidos.verDetalle');
  }
}
