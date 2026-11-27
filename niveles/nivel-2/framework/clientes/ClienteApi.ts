import { expect, type APIRequestContext } from '@playwright/test';
import { CONTRASENA } from '../soporte';

/**
 * Obtiene un token de la API de la tienda. Ya está completo.
 */
export async function obtenerToken(request: APIRequestContext, usuario = 'estandar'): Promise<string> {
  const respuesta = await request.post('/api/login', { data: { usuario, contrasena: CONTRASENA } });
  await expect(respuesta, 'no se pudo iniciar sesión por API').toBeOK();
  const { token } = await respuesta.json();
  return token;
}

/**
 * Clase base de los clientes de API. Ya está completa.
 * Agrega el header Authorization a todas las peticiones.
 */
export abstract class ClienteApi {
  constructor(
    protected readonly request: APIRequestContext,
    private readonly token: string,
  ) {}

  protected get headers() {
    return { Authorization: `Bearer ${this.token}` };
  }

  protected get(ruta: string, params?: Record<string, string | number>) {
    return this.request.get(ruta, { headers: this.headers, params });
  }

  protected post(ruta: string, data: unknown) {
    return this.request.post(ruta, { headers: this.headers, data });
  }

  protected patch(ruta: string, data: unknown) {
    return this.request.patch(ruta, { headers: this.headers, data });
  }

  protected put(ruta: string, data: unknown) {
    return this.request.put(ruta, { headers: this.headers, data });
  }

  protected delete(ruta: string) {
    return this.request.delete(ruta, { headers: this.headers });
  }
}
