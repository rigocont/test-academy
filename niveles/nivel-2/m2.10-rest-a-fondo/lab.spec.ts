import { test, expect } from '@playwright/test';
import { porResolver } from '../framework/soporte';
import { nuevoPedido } from '../framework/datos/generadores';

// M2.10 REST a fondo: autenticación, idempotencia y headers.
// API de pedidos: ver app/pedidos.mjs. Todas las rutas piden  Authorization: Bearer <token>.
//   npx playwright test m2.10

test('ejemplo: login por API devuelve un token', async ({ request }) => {
  const respuesta = await request.post('/api/login', { data: { usuario: 'estandar', contrasena: 'secreto123' } });
  expect(respuesta.status()).toBe(200);
  expect(respuesta.headers()['content-type']).toContain('application/json');
  const cuerpo = await respuesta.json();
  expect(cuerpo.token).toMatch(/^tk-[0-9a-f]{24}$/);
  expect(cuerpo.usuario).toBe('estandar');
});

test('login: contraseña incorrecta es 401 y usuario bloqueado es 403', async ({ request }) => {
  porResolver('valida los dos casos y el mensaje de error de cada uno');
});

test('sin token, la API de pedidos responde 401', async ({ request }) => {
  porResolver('GET /api/pedidos sin header, con "Bearer inventado" y con el token sin la palabra Bearer');
});

test('GET es seguro e idempotente: no cambia nada', async ({ request }) => {
  porResolver('obtén un token, consulta el pedido 1 dos veces y valida que ambas respuestas son iguales');
});

test('PUT es idempotente: repetirlo deja el mismo resultado', async ({ request }) => {
  porResolver('crea un pedido, haz PUT /api/pedidos/:id/notas dos veces con el mismo texto y compara');
});

test('POST no es idempotente: repetirlo crea dos recursos', async ({ request }) => {
  porResolver('manda el mismo nuevoPedido() dos veces y valida que los ids son distintos');
});

test('DELETE: la segunda vez el recurso ya no existe', async ({ request }) => {
  porResolver('crea un pedido, bórralo (204) y vuelve a borrarlo (404)');
});
