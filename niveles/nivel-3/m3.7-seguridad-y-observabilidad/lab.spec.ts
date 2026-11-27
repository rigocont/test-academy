import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';
import { obtenerToken } from '../../nivel-2/framework/clientes/ClienteApi';
import { clienteUnico, nuevoPedido } from '../../nivel-2/framework/datos/generadores';
import { porResolver } from '../../nivel-2/framework/soporte';

// M3.7 Lab: pruebas básicas de seguridad y observabilidad.
// Estas pruebas NO sustituyen una auditoría de seguridad. Cubren los errores que un QA
// puede atrapar en cada PR: rutas sin protección, datos sin escapar y campos que el cliente no debe controlar.
//   npx playwright test m3.7

const RUTAS_PROTEGIDAS = [
  { metodo: 'GET', ruta: '/api/pedidos' },
  { metodo: 'POST', ruta: '/api/pedidos' },
  { metodo: 'PATCH', ruta: '/api/pedidos/1' },
  { metodo: 'DELETE', ruta: '/api/pedidos/1' },
  { metodo: 'POST', ruta: '/api/reportes' },
];

// TODO: genera DOS pruebas por ruta (sin token y con token inválido) con un for sobre RUTAS_PROTEGIDAS.
//       Usa request.fetch(ruta, { method, headers }) y valida status 401.
test('matriz de autorización', async () => {
  porResolver('reemplaza esta prueba por las pruebas generadas desde RUTAS_PROTEGIDAS');
});

test('un usuario bloqueado no obtiene token', async ({ request }) => {
  porResolver('haz POST /api/login con usuario "bloqueado" y contrasena "secreto123"; valida status 403');
});

test('el cliente no puede fijar estado ni total (asignación masiva)', async ({ request }) => {
  porResolver(
    'crea un pedido mandando además estado "entregado", total 1 e id 99999; valida que la respuesta tiene ' +
      'estado "pendiente", un total distinto de 1 y un id distinto de 99999',
  );
});

test.describe('en la interfaz', () => {
  test.use({ storageState: ESTADO_ESTANDAR });

  test('el nombre del cliente se muestra como texto, no como HTML (XSS)', async ({ page, request }) => {
    // Un pedido cuyo cliente trae HTML. Si la página lo inserta sin escapar, el script corre.
    const sufijo = clienteUnico('X');
    const cliente = `<img src=x onerror=window.xss=1>${sufijo}`;
    porResolver(
      'crea el pedido por API con ese cliente, ve a /pedidos.html, filtra por el sufijo, valida que ' +
        'la celda muestra el texto literal "<img" y que page.evaluate(() => (window as any).xss) es undefined',
    );
    void [cliente, sufijo];
  });
});

test('cada respuesta trae un id de correlación', async ({ request }) => {
  // Con X-Request-Id puedes buscar en los logs del servidor la petición exacta que falló.
  porResolver(
    'manda GET /salud con el header X-Request-Id "prueba-123" y valida que la respuesta lo devuelve; ' +
      'sin el header, valida que la respuesta trae un id con formato UUID',
  );
});

void [expect, obtenerToken, nuevoPedido, RUTAS_PROTEGIDAS];
