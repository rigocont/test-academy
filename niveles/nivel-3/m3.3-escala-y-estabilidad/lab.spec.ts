import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';
import { obtenerToken } from '../../nivel-2/framework/clientes/ClienteApi';
import { clienteUnico, nuevoPedido } from '../../nivel-2/framework/datos/generadores';
import { porResolver } from '../../nivel-2/framework/soporte';

// M3.3 Lab: una suite que "pasa en mi máquina" pero falla en paralelo.
// Cada prueba trae comentada la versión con el problema. Escribe la versión estable.
// Tu versión debe pasar con:   npx playwright test m3.3 --repeat-each=5 --workers=4

test.use({ storageState: ESTADO_ESTANDAR });

test('cada prueba crea y busca solo sus datos', async ({ request }) => {
  // Versión con el problema:
  //   await request.post('/api/pedidos', { headers, data: { ...nuevoPedido(), cliente: 'Cliente Fijo' } });
  //   const lista = await (await request.get('/api/pedidos?cliente=Cliente Fijo', { headers })).json();
  //   expect(lista.total).toBe(1);   // la 2.ª repetición encuentra 2, la 3.ª encuentra 3...
  porResolver(
    'obtén un token con obtenerToken(request), crea un pedido con clienteUnico() y valida que ' +
      'GET /api/pedidos?cliente=<ese nombre> devuelve total 1',
  );
});

test('espera por estado, no por tiempo', async ({ page }) => {
  // Versión con el problema:
  //   await page.goto('/productos.html');
  //   await page.waitForTimeout(500);                       // a veces la API tarda 700 ms
  //   expect(await page.locator('article').count()).toBe(6); // count() no reintenta
  porResolver('ve a /productos.html y valida que hay 6 artículos con una aserción que reintenta (toHaveCount)');
});

test('no dependas del orden de la tabla', async ({ page, request }) => {
  // Versión con el problema:
  //   ... crea un pedido ...
  //   await page.goto('/pedidos.html');
  //   await expect(page.locator('tbody tr').last()).toContainText('Cliente QA'); // otros workers también crean pedidos
  porResolver(
    'crea un pedido por API con un cliente único, ve a /pedidos.html, filtra por ese cliente ' +
      'y valida que la fila con ese cliente muestra "pendiente"',
  );
});

test('separa los pasos con test.step para que el reporte sea legible', async ({ request }) => {
  // En un reporte de 500 pruebas, "expect(received).toBe(expected)" no dice nada.
  // Con test.step el reporte muestra en qué paso de negocio falló.
  porResolver(
    'en un test.step "crear pedido" crea un pedido por API; en un test.step "pagar pedido" cámbialo a pagado ' +
      'con PATCH; en un test.step "validar estado" consulta el pedido y valida estado "pagado"',
  );
});

// Para que TypeScript no marque las importaciones sin usar mientras resuelves el lab.
void [expect, obtenerToken, clienteUnico, nuevoPedido];
