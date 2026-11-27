import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';
import { obtenerToken } from '../../nivel-2/framework/clientes/ClienteApi';
import { clienteUnico, nuevoPedido } from '../../nivel-2/framework/datos/generadores';

test.use({ storageState: ESTADO_ESTANDAR });

test('cada prueba crea y busca solo sus datos', async ({ request }) => {
  const headers = { Authorization: `Bearer ${await obtenerToken(request)}` };
  const cliente = clienteUnico();
  const creado = await request.post('/api/pedidos', { headers, data: nuevoPedido({ cliente }) });
  expect(creado.status()).toBe(201);
  const lista = await (await request.get('/api/pedidos', { headers, params: { cliente } })).json();
  expect(lista.total).toBe(1);
});

test('espera por estado, no por tiempo', async ({ page }) => {
  await page.goto('/productos.html');
  await expect(page.locator('article')).toHaveCount(6);
});

test('no dependas del orden de la tabla', async ({ page, request }) => {
  const headers = { Authorization: `Bearer ${await obtenerToken(request)}` };
  const cliente = clienteUnico();
  await request.post('/api/pedidos', { headers, data: nuevoPedido({ cliente }) });
  await page.goto('/pedidos.html');
  // Espera la carga inicial: si filtras antes, esa respuesta puede llegar después y pisar tu filtro.
  await expect(page.locator('tbody tr').first()).toBeVisible();
  await page.getByLabel('Buscar cliente').fill(cliente);
  const fila = page.getByRole('row').filter({ hasText: cliente });
  await expect(fila).toHaveCount(1);
  await expect(fila).toContainText('pendiente');
});

test('separa los pasos con test.step para que el reporte sea legible', async ({ request }) => {
  const headers = { Authorization: `Bearer ${await obtenerToken(request)}` };
  const id = await test.step('crear pedido', async () => {
    const respuesta = await request.post('/api/pedidos', { headers, data: nuevoPedido() });
    expect(respuesta.status()).toBe(201);
    return (await respuesta.json()).id as number;
  });
  await test.step('pagar pedido', async () => {
    const respuesta = await request.patch(`/api/pedidos/${id}`, { headers, data: { estado: 'pagado' } });
    expect(respuesta.status()).toBe(200);
  });
  await test.step('validar estado', async () => {
    const pedido = await (await request.get(`/api/pedidos/${id}`, { headers })).json();
    expect(pedido.estado).toBe('pagado');
  });
});
