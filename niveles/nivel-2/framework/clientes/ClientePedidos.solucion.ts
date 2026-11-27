import { expect, type APIResponse } from '@playwright/test';
import { ClienteApi } from './ClienteApi';
import type { Estado, FiltrosPedidos, NuevoPedido, Pagina, Pedido } from './tipos';

export class ClientePedidos extends ClienteApi {
  listar(filtros: FiltrosPedidos = {}): Promise<APIResponse> {
    const params: Record<string, string | number> = {};
    for (const [clave, valor] of Object.entries(filtros)) {
      if (valor !== undefined) params[clave] = valor;
    }
    return this.get('/api/pedidos', params);
  }

  obtener(id: number): Promise<APIResponse> {
    return this.get(`/api/pedidos/${id}`);
  }

  crear(pedido: NuevoPedido): Promise<APIResponse> {
    return this.post('/api/pedidos', pedido);
  }

  cambiarEstado(id: number, estado: Estado): Promise<APIResponse> {
    return this.patch(`/api/pedidos/${id}`, { estado });
  }

  actualizarNotas(id: number, notas: string): Promise<APIResponse> {
    return this.put(`/api/pedidos/${id}/notas`, { notas });
  }

  borrar(id: number): Promise<APIResponse> {
    return this.delete(`/api/pedidos/${id}`);
  }

  async crearOk(pedido: NuevoPedido): Promise<Pedido> {
    const respuesta = await this.crear(pedido);
    expect(respuesta.status(), await respuesta.text()).toBe(201);
    return respuesta.json();
  }

  async listarOk(filtros: FiltrosPedidos = {}): Promise<Pagina<Pedido>> {
    const respuesta = await this.listar(filtros);
    expect(respuesta.status(), await respuesta.text()).toBe(200);
    return respuesta.json();
  }

  async cambiarEstadoOk(id: number, estado: Estado): Promise<Pedido> {
    const respuesta = await this.cambiarEstado(id, estado);
    expect(respuesta.status(), await respuesta.text()).toBe(200);
    return respuesta.json();
  }
}
