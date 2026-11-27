import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';
import { porResolver } from '../../nivel-2/framework/soporte';

// M3.6 Lab: simular el backend con page.route().
// Cada prueba intercepta GET /api/productos ANTES de abrir /productos.html.
//   npx playwright test m3.6
//
// Recuerda: un mock prueba cómo REACCIONA la interfaz. No prueba que el backend funcione.
// Por eso, además de estas pruebas, mantén al menos una prueba de punta a punta sin mocks.

test.use({ storageState: ESTADO_ESTANDAR });

test('muestra un mensaje si la API responde 500', async ({ page }) => {
  porResolver(
    'usa page.route("**/api/productos", ...) para responder status 500; abre /productos.html y valida ' +
      'que el alert dice "No pudimos cargar los productos"',
  );
});

test('muestra los productos que devuelve la API', async ({ page }) => {
  porResolver(
    'responde con route.fulfill({ json: [...] }) un solo producto { id: 99, nombre: "Producto simulado", ' +
      'precio: 10, categoria: "hogar" }; valida que hay 1 artículo y su encabezado dice "Producto simulado"',
  );
});

test('modifica la respuesta real', async ({ page }) => {
  porResolver(
    'usa route.fetch() para obtener la respuesta real, cambia el precio del producto 1 a 1 y responde con ' +
      'route.fulfill({ response, json }); valida que el producto 1 muestra "$1 MXN"',
  );
});

test('muestra "Cargando" mientras la API tarda', async ({ page }) => {
  porResolver(
    'en la ruta espera 1500 ms antes de route.continue(); valida que "Cargando productos..." se ve ' +
      'y después desaparece cuando llegan los 6 productos',
  );
});

test('muestra un mensaje si se cae la red', async ({ page }) => {
  porResolver('usa route.abort("failed") y valida el mismo mensaje de error');
});

void expect;
