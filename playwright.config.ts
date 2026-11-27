import { defineConfig, devices } from '@playwright/test';

const PUERTO = Number(process.env.PUERTO ?? 3000);

export default defineConfig({
  // Los alumnos trabajan en ejercicio.spec.ts, lab.spec.ts y en su carpeta proyecto-final/.
  // Las soluciones (solucion.ts, solucion.spec.ts y archivos *.solucion.ts) solo se usan
  // con `npm run verificar-soluciones`.
  testMatch: ['**/ejercicio.spec.ts', '**/lab.spec.ts', '**/proyecto-final/*.spec.ts'],
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PUERTO}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'nivel-0',
      testDir: './niveles/nivel-0',
    },
    {
      name: 'nivel-1',
      testDir: './niveles/nivel-1',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'nivel-2',
      testDir: './niveles/nivel-2',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'node app/server.mjs',
    url: `http://localhost:${PUERTO}/salud`,
    reuseExistingServer: !process.env.CI,
    env: { PUERTO: String(PUERTO) },
  },
});
