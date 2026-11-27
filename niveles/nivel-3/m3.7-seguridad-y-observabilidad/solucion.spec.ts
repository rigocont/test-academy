import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';
import { obtenerToken } from '../../nivel-2/framework/clientes/ClienteApi';
import { clienteUnico, nuevoPedido } from '../../nivel-2/framework/datos/generadores';

const RUTAS_PROTEGIDAS = [
  { metodo: 'GET', ruta: '/api/pedidos' },
  { metodo: 'POST', ruta: '/api/pedidos' },
  { metodo: 'PATCH', ruta: '/api/pedidos/1' },
  { metodo: 'DELETE', ruta: '/api/pedidos/1' },
  { metodo: 'POST', ruta: '/api/reportes' },
];

for (const { metodo, ruta } of RUTAS_PROTEGIDAS) {
  test(`${metodo} ${ruta} sin token responde 401`, async ({ request }) => {
    const respuesta = await request.fetch(ruta, { method: metodo });
    expect(respuesta.status()).toBe(401);
  });

  test(`${metodo} ${ruta} con token inválido responde 401`, async ({ request }) => {
    const respuesta = await request.fetch(ruta, { method: metodo, headers: { Authorization: 'Bearer inventado' } });
    expect(respuesta.status()).toBe(401);
  });
}

test('un usuario bloqueado no obtiene token', async ({ request }) => {
  const respuesta = await request.post('/api/login', { data: { usuario: 'bloqueado', contrasena: 'secreto123' } });
  expect(respuesta.status()).toBe(403);
});

test('el cliente no puede fijar estado ni total (asignación masiva)', async ({ request }) => {
  const headers = { Authorization: `Bearer ${await obtenerToken(request)}` };
  const respuesta = await request.post('/api/pedidos', {
    headers,
    data: { ...nuevoPedido(), estado: 'entregado', total: 1, id: 99999 },
  });
  expect(respuesta.status()).toBe(201);
  const pedido = await respuesta.json();
  expect(pedido.estado).toBe('pendiente');
  expect(pedido.total).not.toBe(1);
  expect(pedido.id).not.toBe(99999);
});

test.describe('en la interfaz', () => {
  test.use({ storageState: ESTADO_ESTANDAR });

  test('el nombre del cliente se muestra como texto, no como HTML (XSS)', async ({ page, request }) => {
    const sufijo = clienteUnico('X');
    const cliente = `<img src=x onerror=window.xss=1>${sufijo}`;
    const headers = { Authorization: `Bearer ${await obtenerToken(request)}` };
    await request.post('/api/pedidos', { headers, data: nuevoPedido({ cliente }) });

    await page.goto('/pedidos.html');
    await expect(page.locator('tbody tr').first()).toBeVisible();
    await page.getByLabel('Buscar cliente').fill(sufijo);
    const fila = page.getByRole('row').filter({ hasText: '<img' });
    await expect(fila).toHaveCount(1);
    expect(await page.evaluate(() => (window as unknown as { xss?: number }).xss)).toBeUndefined();
  });
});

test('cada respuesta trae un id de correlación', async ({ request }) => {
  const conId = await request.get('/salud', { headers: { 'X-Request-Id': 'prueba-123' } });
  expect(conId.headers()['x-request-id']).toBe('prueba-123');

  const sinId = await request.get('/salud');
  expect(sinId.headers()['x-request-id']).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
});
