import { expect, type Locator } from '@playwright/test';
import { PaginaBase } from './PaginaBase';
import { CONTRASENA } from '../soporte';

export class PaginaLogin extends PaginaBase {
  readonly ruta = '/';

  get mensajeError(): Locator {
    return this.page.getByRole('alert');
  }

  async entrar(usuario: string, contrasena: string = CONTRASENA): Promise<void> {
    await this.page.getByLabel('Usuario').fill(usuario);
    await this.page.getByLabel('Contraseña').fill(contrasena);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }

  async entrarComo(usuario: string): Promise<void> {
    await this.entrar(usuario);
    await expect(this.page).toHaveURL(/productos/);
  }
}
