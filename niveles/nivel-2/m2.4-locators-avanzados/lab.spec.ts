import { test, expect } from '../framework/fixtures';
import { PaginaPedidos } from '../framework/paginas/PaginaPedidos';
import { obtenerToken } from '../framework/clientes/ClienteApi';
import { clienteUnico, nuevoPedido } from '../framework/datos/generadores';
import type { Pedido } from '../framework/clientes/tipos';

// M2.4 Locators avanzados y estrategia
// Estas pruebas YA ESTÁN ESCRITAS. Completa framework/paginas/PaginaPedidos.ts.
// Cada prueba crea sus propios pedidos por API con un cliente único: así nunca depende
// de los datos de otra prueba ni del orden de la tabla.
//   npx playwright test m2.4

async function crearPedidos(request: import('@playwright/test').APIRequestContext, cliente: string, cantidad: number) {
  const token = await obtenerToken(request);
  const creados: Pedido[] = [];
  for (let i = 0; i < cantidad; i++) {
    const respuesta = await request.post('/api/pedidos', {
      headers: { Authorization: `Bearer ${token}` },
      data: nuevoPedido({ cliente }),
    });
    creados.push(await respuesta.json());
  }
  return creados;
}

test.beforeEach(async ({ paginaProductos }) => {
  // Inicia sesión por la UI (fixture de M2.3) y va a Pedidos.
  await paginaProductos.encabezado.irA('Pedidos');
});

test('buscar un cliente deja solo sus pedidos', async ({ page, request }) => {
  const cliente = clienteUnico('Buscar');
  await crearPedidos(request, cliente, 2);
  const pedidos = new PaginaPedidos(page);
  await pedidos.buscarCliente(cliente);
  await expect(pedidos.filas).toHaveCount(2);
});

test('filaDePedido no confunde #1 con #12', async ({ page }) => {
  const pedidos = new PaginaPedidos(page);
  await expect(pedidos.filaDePedido(1)).toHaveCount(1);
  await expect(pedidos.filaDePedido(1)).not.toContainText('#12');
});

test('celda encuentra la columna por su encabezado', async ({ page, request }) => {
  const cliente = clienteUnico('Celda');
  const [pedido] = await crearPedidos(request, cliente, 1);
  const pedidos = new PaginaPedidos(page);
  await pedidos.buscarCliente(cliente);
  const fila = pedidos.filaDePedido(pedido.id);
  await expect(await pedidos.celda(fila, 'Cliente')).toHaveText(cliente);
  await expect(await pedidos.celda(fila, 'Estado')).toHaveText('pendiente');
  await expect(await pedidos.celda(fila, 'Total')).toHaveText('$498 MXN');
});

test('filtrar por estado', async ({ page }) => {
  const pedidos = new PaginaPedidos(page);
  await pedidos.filtrarPorEstado('Entregado');
  await expect(pedidos.filas.first()).toBeVisible();
  for (const fila of await pedidos.filas.all()) {
    await expect(await pedidos.celda(fila, 'Estado')).toHaveText('entregado');
  }
});

test('paginación', async ({ page, request }) => {
  const cliente = clienteUnico('Paginas');
  await crearPedidos(request, cliente, 7); // 5 por página → 2 páginas
  const pedidos = new PaginaPedidos(page);
  await pedidos.buscarCliente(cliente);
  await expect(pedidos.paginaActual).toHaveText('Página 1 de 2');
  await expect(pedidos.filas).toHaveCount(5);
  await pedidos.paginaSiguiente();
  await expect(pedidos.paginaActual).toHaveText('Página 2 de 2');
  await expect(pedidos.filas).toHaveCount(2);
});

test('el detalle se abre en un diálogo y permite pagar', async ({ page, request }) => {
  const cliente = clienteUnico('Detalle');
  const [pedido] = await crearPedidos(request, cliente, 1);
  const pedidos = new PaginaPedidos(page);
  await pedidos.buscarCliente(cliente);

  const detalle = await pedidos.verDetalle(pedido.id);
  await expect(detalle).toBeVisible();
  await expect(detalle.getByRole('heading')).toHaveText(`Pedido #${pedido.id}`);
  await expect(detalle.getByTestId('detalle-cliente')).toHaveText(cliente);

  await detalle.getByRole('button', { name: 'Marcar como pagado' }).click();
  await expect(detalle.getByTestId('detalle-estado')).toHaveText('pagado');

  // Pagar dos veces no está permitido: el diálogo muestra el error de la API.
  await detalle.getByRole('button', { name: 'Marcar como pagado' }).click();
  await expect(detalle.getByRole('alert')).toHaveText('Transición no permitida: pagado → pagado');

  await detalle.getByRole('button', { name: 'Cerrar' }).click();
  await expect(detalle).toBeHidden();
  await expect(await pedidos.celda(pedidos.filaDePedido(pedido.id), 'Estado')).toHaveText('pagado');
});
