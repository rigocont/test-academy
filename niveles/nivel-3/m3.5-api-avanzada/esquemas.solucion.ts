import { z } from 'zod';

export const EsquemaError = z.object({ error: z.string().min(1) }).strict();

export const EsquemaPedido = z
  .object({
    id: z.number().int().positive(),
    cliente: z.string(),
    cp: z.string().regex(/^\d{5}$/),
    productos: z
      .array(z.object({ id: z.number().int(), cantidad: z.number().int().min(1).max(10) }).strict())
      .nonempty(),
    total: z.number().nonnegative(),
    estado: z.enum(['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado']),
    notas: z.string(),
  })
  .strict();

export const EsquemaPaginaPedidos = z
  .object({
    datos: z.array(EsquemaPedido),
    pagina: z.number().int().nonnegative(),
    porPagina: z.number().int().nonnegative(),
    total: z.number().int().nonnegative(),
  })
  .strict();

export const EsquemaReporte = z.discriminatedUnion('estado', [
  z.object({ id: z.number().int(), estado: z.literal('procesando') }).strict(),
  z
    .object({
      id: z.number().int(),
      estado: z.literal('listo'),
      resultado: z.object({ pedidos: z.number().int().nonnegative(), total: z.number().nonnegative() }).strict(),
    })
    .strict(),
]);
