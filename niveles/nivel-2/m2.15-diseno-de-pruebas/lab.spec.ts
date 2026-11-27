import { test, expect } from '../framework/fixtures';
import { nuevoPedido } from '../framework/datos/generadores';
import type { Estado } from '../framework/clientes/tipos';
import { porResolver } from '../framework/soporte';

// M2.15 Diseño de pruebas aplicado: transición de estados y tablas de decisión.
//
// Historia de usuario: "Como encargado de envíos quiero cambiar el estado de un pedido
// para que el cliente sepa dónde está."
//
// Criterios de aceptación:
//   1. Un pedido nuevo está "pendiente".
//   2. pendiente → pagado o cancelado.   pagado → enviado o cancelado.   enviado → entregado.
//   3. entregado y cancelado son estados finales: no cambian.
//   4. Cualquier otra transición responde 409 con "Transición no permitida: <de> → <a>".
//   5. Solo se pueden borrar pedidos pendientes o cancelados (409 en otro caso).
//
// Antes de programar, en guia.md dibuja el diagrama de estados y llena la tabla de transiciones.
//   npx playwright test m2.15

/** Lleva un pedido nuevo hasta `estado` por el camino válido más corto. Ya está completo. */
const CAMINO: Record<Estado, Estado[]> = {
  pendiente: [],
  pagado: ['pagado'],
  enviado: ['pagado', 'enviado'],
  entregado: ['pagado', 'enviado', 'entregado'],
  cancelado: ['cancelado'],
};

test('ejemplo: un pedido nuevo está pendiente', async ({ pedidos }) => {
  const pedido = await pedidos.crearOk(nuevoPedido());
  expect(pedido.estado).toBe('pendiente');
});

test('transiciones válidas (criterio 2)', async ({ pedidos }) => {
  porResolver('genera una prueba por cada transición válida usando CAMINO para preparar el estado de origen');
});

test('transiciones inválidas (criterios 3 y 4)', async ({ pedidos }) => {
  porResolver('genera una prueba por cada par (de, a) que NO es válido, incluido a sí mismo, y valida 409 y el mensaje');
});

test('reglas para borrar (criterio 5)', async ({ pedidos }) => {
  porResolver('tabla de decisión: una prueba por estado, 204 si es pendiente o cancelado y 409 si no');
});

void CAMINO;
