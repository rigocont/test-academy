import { test, expect } from '../framework/fixtures';
import { clienteUnico, nuevoPedido } from '../framework/datos/generadores';

// M2.14 UI + API juntos
// Estas pruebas YA ESTÁN ESCRITAS. Completa el fixture `paginaPedidos` en framework/fixtures.ts:
// debe iniciar sesión SIN pasar por la pantalla de login, guardando usuario y token
// en localStorage con page.addInitScript(), y abrir la página de pedidos.
//
// La idea: preparar datos por API (rápido y estable) y validar por UI solo lo que importa.
// Compara el tiempo de estas pruebas con las de M2.4, que inician sesión por la UI.
//   npx playwright test m2.14

test('un pedido creado por API aparece en la tabla', async ({ pedidos, paginaPedidos }) => {
  const cliente = clienteUnico('Api');
  const pedido = await pedidos.crearOk(nuevoPedido({ cliente }));
  await paginaPedidos.buscarCliente(cliente);
  const fila = paginaPedidos.filaDePedido(pedido.id);
  await expect(await paginaPedidos.celda(fila, 'Estado')).toHaveText('pendiente');
});

test('un cambio de estado por API se ve en el detalle', async ({ pedidos, paginaPedidos }) => {
  const cliente = clienteUnico('Estado');
  const pedido = await pedidos.crearOk(nuevoPedido({ cliente }));
  await pedidos.cambiarEstadoOk(pedido.id, 'pagado');
  await pedidos.cambiarEstadoOk(pedido.id, 'enviado');
  await paginaPedidos.buscarCliente(cliente);
  const detalle = await paginaPedidos.verDetalle(pedido.id);
  await expect(detalle.getByTestId('detalle-estado')).toHaveText('enviado');
});

test('pagar por UI se refleja en la API', async ({ pedidos, paginaPedidos }) => {
  const cliente = clienteUnico('Ui');
  const pedido = await pedidos.crearOk(nuevoPedido({ cliente }));
  await paginaPedidos.buscarCliente(cliente);
  const detalle = await paginaPedidos.verDetalle(pedido.id);
  await detalle.getByRole('button', { name: 'Marcar como pagado' }).click();
  await expect(detalle.getByTestId('detalle-estado')).toHaveText('pagado');

  // La fuente de verdad es la API.
  const actualizado = await (await pedidos.obtener(pedido.id)).json();
  expect(actualizado.estado).toBe('pagado');
});

test('las notas guardadas por API se muestran en el detalle', async ({ pedidos, paginaPedidos }) => {
  const cliente = clienteUnico('Notas');
  const pedido = await pedidos.crearOk(nuevoPedido({ cliente }));
  await pedidos.actualizarNotas(pedido.id, 'Tocar el timbre dos veces');
  await paginaPedidos.buscarCliente(cliente);
  const detalle = await paginaPedidos.verDetalle(pedido.id);
  await expect(detalle.getByTestId('detalle-notas')).toHaveText('Tocar el timbre dos veces');
});

test('con un token vencido la página regresa al login', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('usuario', 'estandar');
    localStorage.setItem('token', 'tk-vencido');
  });
  await page.goto('/pedidos.html');
  await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
});
