# M3.2 Configuración y ambientes (12 h)

## Objetivo

Correr la misma suite en varios ambientes cambiando una sola variable, sin secretos en el código
y sin repetir el login en cada prueba.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | `projects`: mismo código, distinta configuración (navegador, ambiente, usuario) |
| 25 min | Ambientes: un archivo de configuración, una variable `AMBIENTE` |
| 20 min | Secretos: `.env` local, secrets del CI, nunca en el repo ni en los logs |
| 25 min | `storageState` y proyectos de setup con `dependencies` |

## Conceptos clave

```ts
// playwright.config.ts
const ambiente = cargarAmbiente(process.env.AMBIENTE, process.env);
export default defineConfig({
  retries: ambiente.reintentos,
  use: { baseURL: ambiente.baseURL },
  projects: [
    { name: 'setup', testMatch: '**/*.setup.ts' },
    { name: 'chromium', dependencies: ['setup'], use: { storageState: 'playwright/.auth/estandar.json' } },
  ],
});
```

```bash
AMBIENTE=qa npx playwright test          # Linux / macOS
$env:AMBIENTE="qa"; npx playwright test  # PowerShell
```

- **Un solo lugar** para la configuración de cada ambiente. Si cambias la URL de QA, cambias una línea.
- **Falla rápido:** un nombre de ambiente mal escrito debe romper la corrida con un mensaje claro, no correr contra local.
- **Secretos:** en local van en `.env` (en `.gitignore`); en el CI, en *secrets* del repositorio. Si los imprimes
  para depurar, enmascáralos.
- **`storageState`:** el proyecto de setup inicia sesión UNA vez y guarda cookies y `localStorage`.
  Las pruebas lo cargan y arrancan con sesión. En este repo el setup es `auth.setup.ts` y el estado
  queda en `playwright/.auth/` (ignorado por git).
- `test.use({ storageState: { cookies: [], origins: [] } })` quita la sesión en un grupo de pruebas.
- **Ambientes de solo lectura:** en staging o producción las pruebas que crean datos se saltan:
  `test.skip(!ambiente.permiteEscritura, 'staging es de solo lectura')`.

## Lab (3 h + 6 h de práctica)

1. Completa `ejercicio.ts` (`cargarAmbiente` y `ocultarSecretos`).
2. Completa `lab.spec.ts` para usar la sesión guardada.
3. Corre `npx playwright test m3.2`. Nota que el proyecto `nivel-3-setup` corre primero.
4. **Reto:** conecta `cargarAmbiente` a una copia de `playwright.config.ts` y corre la suite con
   `AMBIENTE=local` y con `BASE_URL=http://localhost:3100` (arranca un segundo servidor con
   `PUERTO=3100 npm run app`).

## Preguntas de repaso

1. ¿Por qué no conviene que un ambiente desconocido caiga en "local" por defecto?
2. ¿Qué guarda `storageState` y qué NO guarda?
3. ¿Por qué local tiene 0 reintentos?
4. Un compañero sube un token al repo por error. ¿Qué haces, además de borrarlo?
