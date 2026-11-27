import { test, expect } from '../framework/fixtures';
import { clienteUnico, nuevoPedido } from '../framework/datos/generadores';

// M2.12 Utilidades de API reutilizables
// Estas pruebas YA ESTÁN ESCRITAS. Completa framework/clientes/ClientePedidos.ts.
// El fixture `pedidos` ya te entrega un ClientePedidos con el token puesto.
// Compara con M2.11: aquí las pruebas no saben de rutas, headers ni JSON.
//   npx playwright test m2.12

test('crearOk devuelve el pedido tipado', async ({ pedidos }) => {
  const pedido = await pedidos.crearOk(nuevoPedido());
  expect(pedido.estado).toBe('pendiente');
  expect(pedido.total).toBe(498);
});

test('obtener un pedido existente y uno que no existe', async ({ pedidos }) => {
  const pedido = await pedidos.crearOk(nuevoPedido());
  expect(await (await pedidos.obtener(pedido.id)).json()).toEqual(pedido);
  expect((await pedidos.obtener(999_999)).status()).toBe(404);
});

test('listarOk con filtros', async ({ pedidos }) => {
  const cliente = clienteUnico('Listar');
  await pedidos.crearOk(nuevoPedido({ cliente }));
  await pedidos.crearOk(nuevoPedido({ cliente }));
  const pagina = await pedidos.listarOk({ cliente, porPagina: 1 });
  expect(pagina.total).toBe(2);
  expect(pagina.datos).toHaveLength(1);
  expect(pagina.datos[0].cliente).toBe(cliente);
});

test('cambiar estado: flujo feliz', async ({ pedidos }) => {
  const { id } = await pedidos.crearOk(nuevoPedido());
  await pedidos.cambiarEstadoOk(id, 'pagado');
  await pedidos.cambiarEstadoOk(id, 'enviado');
  const entregado = await pedidos.cambiarEstadoOk(id, 'entregado');
  expect(entregado.estado).toBe('entregado');
});

test('cambiar estado: transición inválida devuelve 409', async ({ pedidos }) => {
  const { id } = await pedidos.crearOk(nuevoPedido());
  const respuesta = await pedidos.cambiarEstado(id, 'entregado');
  expect(respuesta.status()).toBe(409);
});

test('actualizar notas y borrar', async ({ pedidos }) => {
  const { id } = await pedidos.crearOk(nuevoPedido());
  const conNotas = await (await pedidos.actualizarNotas(id, 'Frágil')).json();
  expect(conNotas.notas).toBe('Frágil');
  expect((await pedidos.borrar(id)).status()).toBe(204);
});

test('crear con datos inválidos', async ({ pedidos }) => {
  const respuesta = await pedidos.crear(nuevoPedido({ cp: '123' }));
  expect(respuesta.status()).toBe(400);
  expect((await respuesta.json()).error).toBe('El código postal debe tener 5 dígitos');
});
