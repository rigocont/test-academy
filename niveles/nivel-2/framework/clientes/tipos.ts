// Tipos de la API de la tienda de práctica. Ya están completos.

export type Estado = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';

export interface LineaPedido {
  id: number;
  cantidad: number;
}

export interface NuevoPedido {
  cliente: string;
  cp: string;
  productos: LineaPedido[];
}

export interface Pedido extends NuevoPedido {
  id: number;
  total: number;
  estado: Estado;
  notas: string;
}

export interface Pagina<T> {
  datos: T[];
  pagina: number;
  porPagina: number;
  total: number;
}

export interface FiltrosPedidos {
  estado?: Estado;
  cliente?: string;
  pagina?: number;
  porPagina?: number;
}

export interface ErrorApi {
  error: string;
}
