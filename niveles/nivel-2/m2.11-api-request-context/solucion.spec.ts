import { test, expect, request as playwrightRequest, type APIRequestContext } from '@playwright/test';
import { clienteUnico, nuevoPedido } from '../framework/datos/generadores';

let api: APIRequestContext;

test.beforeAll(async ({ baseURL }) => {
  const anonimo = await playwrightRequest.newContext({ baseURL });
  const { token } = await (await anonimo.post('/api/login', { data: { usuario: 'estandar', contrasena: 'secreto123' } })).json();
  await anonimo.dispose();

  api = await playwrightRequest.newContext({
    baseURL,
    extraHTTPHeaders: { Authorization: `Bearer ${token}` },
  });
});

test.afterAll(async () => {
  await api?.dispose();
});

test('el contexto ya trae el token', async () => {
  const respuesta = await api.get('/api/pedidos');
  expect(respuesta.status()).toBe(200);
});

test('crear y consultar un pedido', async () => {
  const datos = nuevoPedido();
  const creado = await api.post('/api/pedidos', { data: datos });
  expect(creado.status()).toBe(201);
  const pedido = await creado.json();
  expect(pedido).toMatchObject({ ...datos, total: 498, estado: 'pendiente', notas: '' });

  const consultado = await api.get(`/api/pedidos/${pedido.id}`);
  expect(await consultado.json()).toEqual(pedido);
});

test('paginación: porPagina y total', async () => {
  const cliente = clienteUnico('Paginado');
  for (let i = 0; i < 3; i++) await api.post('/api/pedidos', { data: nuevoPedido({ cliente }) });

  const pagina1 = await (await api.get('/api/pedidos', { params: { cliente, porPagina: 2 } })).json();
  expect(pagina1.datos).toHaveLength(2);
  expect(pagina1.total).toBe(3);

  const pagina2 = await (await api.get('/api/pedidos', { params: { cliente, porPagina: 2, pagina: 2 } })).json();
  expect(pagina2.datos).toHaveLength(1);
  expect(pagina2.pagina).toBe(2);
});

test('filtro por estado', async () => {
  const { datos } = await (await api.get('/api/pedidos', { params: { estado: 'cancelado', porPagina: 50 } })).json();
  expect(datos.length).toBeGreaterThan(0);
  for (const p of datos) expect(p.estado).toBe('cancelado');
});

test('validaciones del POST', async () => {
  const respuesta = await api.post('/api/pedidos', { data: nuevoPedido({ productos: [] }) });
  expect(respuesta.status()).toBe(400);
  expect(await respuesta.json()).toEqual({ error: 'El pedido necesita al menos un producto' });
});
