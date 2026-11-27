import { test, expect, request as playwrightRequest, type APIRequestContext } from '@playwright/test';
import { porResolver } from '../framework/soporte';
import { clienteUnico, nuevoPedido } from '../framework/datos/generadores';

// M2.11 APIRequestContext
// En M2.10 repetías el header Authorization en cada llamada. Aquí creas un contexto
// de API propio con baseURL y headers por defecto, una vez por archivo.
//   npx playwright test m2.11

let api: APIRequestContext | undefined;

test.beforeAll(async ({ baseURL }) => {
  // Ejemplo: contexto temporal para obtener el token.
  const anonimo = await playwrightRequest.newContext({ baseURL });
  const { token } = await (await anonimo.post('/api/login', { data: { usuario: 'estandar', contrasena: 'secreto123' } })).json();
  await anonimo.dispose();

  // TODO: crea `api` con playwrightRequest.newContext({ baseURL, extraHTTPHeaders: { Authorization: ... } })
  void token;
});

test.afterAll(async () => {
  await api?.dispose();
});

test('el contexto ya trae el token', async () => {
  porResolver('con `api`, GET /api/pedidos sin pasar headers debe dar 200');
});

test('crear y consultar un pedido', async () => {
  porResolver('POST con nuevoPedido(), valida 201, total 498 y estado pendiente; luego GET por id');
});

test('paginación: porPagina y total', async () => {
  porResolver('crea 3 pedidos del mismo clienteUnico(); lista con cliente y porPagina=2 y valida 2 datos, total 3; página 2 trae 1');
});

test('filtro por estado', async () => {
  porResolver('lista con estado=cancelado y valida que todos los datos están cancelados');
});

test('validaciones del POST', async () => {
  porResolver('manda un pedido sin productos y valida 400 con "El pedido necesita al menos un producto"');
});
