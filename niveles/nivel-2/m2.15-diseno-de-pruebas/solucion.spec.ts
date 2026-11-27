import { test, expect } from '../framework/fixtures';
import { nuevoPedido } from '../framework/datos/generadores';
import type { Estado } from '../framework/clientes/tipos';
import type { ClientePedidos } from '../framework/clientes/ClientePedidos';

const ESTADOS: Estado[] = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];

const VALIDAS: Record<Estado, Estado[]> = {
  pendiente: ['pagado', 'cancelado'],
  pagado: ['enviado', 'cancelado'],
  enviado: ['entregado'],
  entregado: [],
  cancelado: [],
};

const CAMINO: Record<Estado, Estado[]> = {
  pendiente: [],
  pagado: ['pagado'],
  enviado: ['pagado', 'enviado'],
  entregado: ['pagado', 'enviado', 'entregado'],
  cancelado: ['cancelado'],
};

async function pedidoEn(pedidos: ClientePedidos, estado: Estado) {
  const pedido = await pedidos.crearOk(nuevoPedido());
  for (const paso of CAMINO[estado]) await pedidos.cambiarEstadoOk(pedido.id, paso);
  return pedido.id;
}

test('ejemplo: un pedido nuevo está pendiente', async ({ pedidos }) => {
  const pedido = await pedidos.crearOk(nuevoPedido());
  expect(pedido.estado).toBe('pendiente');
});

test.describe('transiciones válidas', () => {
  for (const de of ESTADOS) {
    for (const a of VALIDAS[de]) {
      test(`${de} → ${a}`, async ({ pedidos }) => {
        const id = await pedidoEn(pedidos, de);
        const actualizado = await pedidos.cambiarEstadoOk(id, a);
        expect(actualizado.estado).toBe(a);
      });
    }
  }
});

test.describe('transiciones inválidas', () => {
  for (const de of ESTADOS) {
    for (const a of ESTADOS.filter((e) => !VALIDAS[de].includes(e))) {
      test(`${de} → ${a} es 409`, async ({ pedidos }) => {
        const id = await pedidoEn(pedidos, de);
        const respuesta = await pedidos.cambiarEstado(id, a);
        expect(respuesta.status()).toBe(409);
        expect((await respuesta.json()).error).toBe(`Transición no permitida: ${de} → ${a}`);
      });
    }
  }
});

test.describe('reglas para borrar', () => {
  for (const estado of ESTADOS) {
    const permitido = estado === 'pendiente' || estado === 'cancelado';
    test(`borrar un pedido ${estado} → ${permitido ? 204 : 409}`, async ({ pedidos }) => {
      const id = await pedidoEn(pedidos, estado);
      expect((await pedidos.borrar(id)).status()).toBe(permitido ? 204 : 409);
    });
  }
});
