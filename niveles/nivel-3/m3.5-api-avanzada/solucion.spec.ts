import { test, expect } from '@playwright/test';
import { EsquemaError, EsquemaPaginaPedidos, EsquemaPedido, EsquemaReporte } from './esquemas';
import { obtenerToken } from '../../nivel-2/framework/clientes/ClienteApi';
import { nuevoPedido } from '../../nivel-2/framework/datos/generadores';

let headers: Record<string, string>;
test.beforeEach(async ({ request }) => {
  headers = { Authorization: `Bearer ${await obtenerToken(request)}` };
});

test('la lista de pedidos cumple el contrato', async ({ request }) => {
  const respuesta = await request.get('/api/pedidos', { headers });
  expect(respuesta.status()).toBe(200);
  EsquemaPaginaPedidos.parse(await respuesta.json());
});

test('un pedido creado cumple el contrato', async ({ request }) => {
  const respuesta = await request.post('/api/pedidos', { headers, data: nuevoPedido() });
  expect(respuesta.status()).toBe(201);
  EsquemaPedido.parse(await respuesta.json());
});

test('los errores también tienen contrato', async ({ request }) => {
  const respuesta = await request.post('/api/pedidos', { headers, data: nuevoPedido({ cp: 'abc' }) });
  expect(respuesta.status()).toBe(400);
  EsquemaError.parse(await respuesta.json());
});

test('el esquema detecta un cambio de contrato', async () => {
  const respuestaNueva = { id: 1, cliente: 'Ana', cp: '06600', productos: [{ id: 4, cantidad: 1 }], importe: 249, estado: 'pendiente', notas: '' };
  expect(EsquemaPedido.safeParse(respuestaNueva).success).toBe(false);
});

test('un reporte asíncrono termina en "listo"', async ({ request }) => {
  const creado = await request.post('/api/reportes', { headers, data: { estado: 'pagado' } });
  expect(creado.status()).toBe(202);
  const { id } = await creado.json();

  await expect
    .poll(async () => (await (await request.get(`/api/reportes/${id}`, { headers })).json()).estado, { timeout: 5000 })
    .toBe('listo');

  const final = await (await request.get(`/api/reportes/${id}`, { headers })).json();
  EsquemaReporte.parse(final);
  expect(final.resultado.pedidos).toBeGreaterThan(0);
});
