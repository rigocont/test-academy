import { test, expect } from '@playwright/test';
import { ESTADO_ESTANDAR } from '../rutas';
import { porResolver } from '../../nivel-2/framework/soporte';

// M3.2 Sesión reutilizable con storageState.
// El proyecto "nivel-3-setup" (auth.setup.ts) ya inició sesión y guardó el estado en ESTADO_ESTANDAR.
// Úsalo para que estas pruebas arranquen con sesión, sin pasar por el login.
//   npx playwright test m3.2

// TODO: aplica el estado guardado a todas las pruebas de este archivo con test.use({ storageState: ... })

test('arranca con la sesión iniciada', async ({ page }) => {
  porResolver('ve directo a /productos.html y valida que el usuario actual es "estandar"');
});

test('la sesión incluye el token de la API', async ({ page }) => {
  porResolver('ve a /pedidos.html y valida que la tabla de pedidos se muestra (la página necesita el token)');
});

test.describe('sin sesión', () => {
  // TODO: este grupo debe empezar SIN sesión aunque el archivo use storageState.
  //       Pista: test.use({ storageState: { cookies: [], origins: [] } })

  test('productos sin sesión regresa al login', async ({ page }) => {
    porResolver('ve a /productos.html y valida que terminas en el login');
  });
});
