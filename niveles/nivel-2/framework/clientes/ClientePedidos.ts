import type { APIResponse } from '@playwright/test';
import { ClienteApi } from './ClienteApi';
import type { Estado, FiltrosPedidos, NuevoPedido, Pagina, Pedido } from './tipos';
import { porResolver } from '../soporte';

// M2.12: completa este cliente de API.
// Los métodos que devuelven APIResponse no validan nada: así las pruebas pueden revisar errores.
// Los métodos que terminan en "Ok" validan el código esperado y devuelven el cuerpo ya tipado.

export class ClientePedidos extends ClienteApi {
  listar(filtros: FiltrosPedidos = {}): Promise<APIResponse> {
    return porResolver('ClientePedidos.listar: GET /api/pedidos con los filtros como query params');
  }

  obtener(id: number): Promise<APIResponse> {
    return porResolver('ClientePedidos.obtener');
  }

  crear(pedido: NuevoPedido): Promise<APIResponse> {
    return porResolver('ClientePedidos.crear');
  }

  cambiarEstado(id: number, estado: Estado): Promise<APIResponse> {
    return porResolver('ClientePedidos.cambiarEstado: PATCH /api/pedidos/:id');
  }

  actualizarNotas(id: number, notas: string): Promise<APIResponse> {
    return porResolver('ClientePedidos.actualizarNotas: PUT /api/pedidos/:id/notas');
  }

  borrar(id: number): Promise<APIResponse> {
    return porResolver('ClientePedidos.borrar');
  }

  /** Crea el pedido, valida 201 y devuelve el pedido creado. */
  async crearOk(pedido: NuevoPedido): Promise<Pedido> {
    return porResolver('ClientePedidos.crearOk');
  }

  /** Lista, valida 200 y devuelve la página. */
  async listarOk(filtros: FiltrosPedidos = {}): Promise<Pagina<Pedido>> {
    return porResolver('ClientePedidos.listarOk');
  }

  /** Cambia el estado, valida 200 y devuelve el pedido actualizado. */
  async cambiarEstadoOk(id: number, estado: Estado): Promise<Pedido> {
    return porResolver('ClientePedidos.cambiarEstadoOk');
  }
}
