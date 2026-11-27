import type { Locator, Page } from '@playwright/test';
import { Encabezado } from '../componentes/Encabezado';

/**
 * Clase base de todas las páginas. Ya está completa.
 * Cada página hija define su `ruta` y hereda abrir(), titulo y encabezado.
 */
export abstract class PaginaBase {
  abstract readonly ruta: string;
  readonly encabezado: Encabezado;

  constructor(protected readonly page: Page) {
    this.encabezado = new Encabezado(page);
  }

  /** El título principal (h1) de la página. */
  get titulo(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  async abrir() {
    await this.page.goto(this.ruta);
  }
}
