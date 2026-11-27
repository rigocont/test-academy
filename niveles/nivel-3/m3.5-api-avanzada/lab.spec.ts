import { test, expect } from '@playwright/test';
import { EsquemaError, EsquemaPaginaPedidos, EsquemaPedido, EsquemaReporte } from './esquemas';
import { obtenerToken } from '../../nivel-2/framework/clientes/ClienteApi';
import { nuevoPedido } from '../../nivel-2/framework/datos/generadores';
import { porResolver } from '../../nivel-2/framework/soporte';

// M3.5 Lab: pruebas de contrato y APIs asíncronas.
// Primero completa esquemas.ts. Luego resuelve cada prueba.
//   npx playwright test m3.5

let headers: Record<string, string>;
test.beforeEach(async ({ request }) => {
  headers = { Authorization: `Bearer ${await obtenerToken(request)}` };
});

test('la lista de pedidos cumple el contrato', async ({ request }) => {
  porResolver('haz GET /api/pedidos y valida el cuerpo con EsquemaPaginaPedidos.parse(...)');
});

test('un pedido creado cumple el contrato', async ({ request }) => {
  porResolver('crea un pedido con nuevoPedido() y valida la respuesta 201 con EsquemaPedido');
});

test('los errores también tienen contrato', async ({ request }) => {
  porResolver('crea un pedido con cp "abc"; valida status 400 y el cuerpo con EsquemaError');
});

test('el esquema detecta un cambio de contrato', async () => {
  // Simula que el backend renombró "total" a "importe" y agregó un campo.
  const respuestaNueva = { id: 1, cliente: 'Ana', cp: '06600', productos: [{ id: 4, cantidad: 1 }], importe: 249, estado: 'pendiente', notas: '' };
  porResolver('valida que EsquemaPedido.safeParse(respuestaNueva).success es false');
  void respuestaNueva;
});

test('un reporte asíncrono termina en "listo"', async ({ request }) => {
  // POST /api/reportes responde 202 de inmediato; el resultado llega ~1.5 s después.
  // No uses waitForTimeout: pregunta hasta que esté listo con expect.poll.
  porResolver(
    'crea un reporte con { estado: "pagado" } (espera 202), usa expect.poll para consultar ' +
      'GET /api/reportes/:id hasta que estado sea "listo" (timeout 5000) y valida el cuerpo final con EsquemaReporte',
  );
});

void [expect, EsquemaError, EsquemaPaginaPedidos, EsquemaPedido, EsquemaReporte, nuevoPedido];
