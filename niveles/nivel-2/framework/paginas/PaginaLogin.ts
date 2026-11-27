import { expect, type Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';
import { CONTRASENA, porResolver } from '../soporte';

// M2.2: completa este Page Object. Las pruebas de m2.2-page-object-model/lab.spec.ts te guían.

export class PaginaLogin extends PaginaBase {
  readonly ruta = '/';

  /** El mensaje de error del formulario (tiene role="alert"). */
  get mensajeError(): Locator {
    return porResolver('PaginaLogin.mensajeError');
  }

  /** Llena usuario y contraseña y da clic en "Entrar". No valida el resultado. */
  async entrar(usuario: string, contrasena: string = CONTRASENA): Promise<void> {
    porResolver('PaginaLogin.entrar');
  }

  /** Entra y espera a llegar a la página de productos. */
  async entrarComo(usuario: string): Promise<void> {
    porResolver('PaginaLogin.entrarComo');
  }
}
