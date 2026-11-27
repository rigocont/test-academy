import { test, expect } from '@playwright/test';
import { porResolver } from '../soporte';

// M1.9 Primeras pruebas de API
// El fixture `request` hace llamadas HTTP sin abrir el navegador. Usa la misma baseURL.
// Automatiza aquí los endpoints que documentaste en M0.9.
//   npx playwright test m1.9

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

// Las pruebas de este archivo crean y borran usuarios en el mismo servidor.
// Por eso corren en serie (una después de otra) y cada una reinicia los datos al empezar.
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ request }) => {
  await request.post('/api/reiniciar');
});

test('ejemplo: GET de un producto', async ({ request }) => {
  const respuesta = await request.get('/api/productos/3');
  expect(respuesta.status()).toBe(200);
  const producto: Producto = await respuesta.json();
  expect(producto.nombre).toBe('Audífonos inalámbricos');
  expect(producto.precio).toBe(1299);
});

test('GET de la lista de productos', async ({ request }) => {
  porResolver('pide /api/productos, valida toBeOK() y que la lista tiene 6 productos');
});

test('GET con query param', async ({ request }) => {
  porResolver('pide /api/productos?categoria=hogar y valida que todos los productos son de "hogar"');
});

test('GET de un producto que no existe', async ({ request }) => {
  porResolver('pide /api/productos/999, valida status 404 y el mensaje de error del body');
});

test('POST crea un usuario', async ({ request }) => {
  porResolver('crea un usuario con nombre y correo, valida 201 y que la respuesta trae un id y los mismos datos');
});

test('POST con correo inválido', async ({ request }) => {
  porResolver('manda un correo sin @, valida 400 y { error: "El correo no es válido" }');
});

test('DELETE borra un usuario', async ({ request }) => {
  porResolver('crea un usuario, bórralo, valida 204 y que un GET a ese id da 404');
});
