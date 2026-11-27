import { test, expect, type APIRequestContext } from '@playwright/test';
import { nuevoPedido } from '../framework/datos/generadores';

async function token(request: APIRequestContext) {
  const respuesta = await request.post('/api/login', { data: { usuario: 'estandar', contrasena: 'secreto123' } });
  return (await respuesta.json()).token as string;
}

test('ejemplo: login por API devuelve un token', async ({ request }) => {
  const respuesta = await request.post('/api/login', { data: { usuario: 'estandar', contrasena: 'secreto123' } });
  expect(respuesta.status()).toBe(200);
  expect(respuesta.headers()['content-type']).toContain('application/json');
  const cuerpo = await respuesta.json();
  expect(cuerpo.token).toMatch(/^tk-[0-9a-f]{24}$/);
  expect(cuerpo.usuario).toBe('estandar');
});

test('login: contraseña incorrecta es 401 y usuario bloqueado es 403', async ({ request }) => {
  const incorrecta = await request.post('/api/login', { data: { usuario: 'estandar', contrasena: 'otra' } });
  expect(incorrecta.status()).toBe(401);
  expect(await incorrecta.json()).toEqual({ error: 'Usuario o contraseña incorrectos' });

  const bloqueado = await request.post('/api/login', { data: { usuario: 'bloqueado', contrasena: 'secreto123' } });
  expect(bloqueado.status()).toBe(403);
  expect(await bloqueado.json()).toEqual({ error: 'Este usuario está bloqueado' });
});

test('sin token, la API de pedidos responde 401', async ({ request }) => {
  const t = await token(request);
  const variantes: Record<string, string>[] = [{}, { Authorization: 'Bearer inventado' }, { Authorization: t }];
  for (const headers of variantes) {
    const respuesta = await request.get('/api/pedidos', { headers });
    expect(respuesta.status(), JSON.stringify(headers)).toBe(401);
  }
});

test('GET es seguro e idempotente: no cambia nada', async ({ request }) => {
  const headers = { Authorization: `Bearer ${await token(request)}` };
  const primera = await (await request.get('/api/pedidos/1', { headers })).json();
  const segunda = await (await request.get('/api/pedidos/1', { headers })).json();
  expect(segunda).toEqual(primera);
});

test('PUT es idempotente: repetirlo deja el mismo resultado', async ({ request }) => {
  const headers = { Authorization: `Bearer ${await token(request)}` };
  const pedido = await (await request.post('/api/pedidos', { headers, data: nuevoPedido() })).json();
  const ruta = `/api/pedidos/${pedido.id}/notas`;
  const primera = await request.put(ruta, { headers, data: { notas: 'Entregar en recepción' } });
  const segunda = await request.put(ruta, { headers, data: { notas: 'Entregar en recepción' } });
  expect(primera.status()).toBe(200);
  expect(segunda.status()).toBe(200);
  expect(await segunda.json()).toEqual(await primera.json());
});

test('POST no es idempotente: repetirlo crea dos recursos', async ({ request }) => {
  const headers = { Authorization: `Bearer ${await token(request)}` };
  const datos = nuevoPedido();
  const a = await (await request.post('/api/pedidos', { headers, data: datos })).json();
  const b = await (await request.post('/api/pedidos', { headers, data: datos })).json();
  expect(a.id).not.toBe(b.id);
});

test('DELETE: la segunda vez el recurso ya no existe', async ({ request }) => {
  const headers = { Authorization: `Bearer ${await token(request)}` };
  const pedido = await (await request.post('/api/pedidos', { headers, data: nuevoPedido() })).json();
  expect((await request.delete(`/api/pedidos/${pedido.id}`, { headers })).status()).toBe(204);
  expect((await request.delete(`/api/pedidos/${pedido.id}`, { headers })).status()).toBe(404);
});
