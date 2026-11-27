import { z } from 'zod';

// M3.5 Esquemas de contrato con zod.
// Un esquema describe la FORMA de una respuesta. Si el backend cambia un campo,
// la prueba falla con un mensaje que dice exactamente qué campo cambió.
// Documentación: https://zod.dev

// Ya está completo como ejemplo:
export const EsquemaError = z.object({ error: z.string().min(1) }).strict();

// TODO: describe un pedido. Campos: id (entero positivo), cliente (texto), cp (5 dígitos),
//       productos (arreglo no vacío de { id: entero, cantidad: entero 1-10 }), total (número >= 0),
//       estado (uno de: pendiente, pagado, enviado, entregado, cancelado), notas (texto).
//       Usa .strict() para que un campo nuevo e inesperado también se detecte.
export const EsquemaPedido = z.never();

// TODO: describe una página de pedidos: { datos: EsquemaPedido[], pagina, porPagina, total } (enteros >= 0).
export const EsquemaPaginaPedidos = z.never();

// TODO: describe un reporte. Mientras procesa: { id, estado: 'procesando' }.
//       Cuando termina: { id, estado: 'listo', resultado: { pedidos, total } }.
//       Pista: z.discriminatedUnion('estado', [ ... ])
export const EsquemaReporte = z.never();
