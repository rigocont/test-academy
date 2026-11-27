# Notas del ponente: M3.2 Configuración y ambientes

## Antes de la clase

- Corre `npx playwright test m3.2` con las soluciones para que exista `playwright/.auth/estandar.json` y puedas abrirlo.
- Arranca un segundo servidor con `PUERTO=3100 npm run app` para la demo de `BASE_URL`.

## Guion de la sesión

1. **`projects` (20 min).** Mismo código, distinta configuración. Recorre los proyectos del `playwright.config.ts` del repo, incluido `nivel-3-setup` con `dependencies`.
2. **Ambientes (25 min).** Explica `cargarAmbiente`: un solo lugar para las URLs, una variable `AMBIENTE` para elegir. Corre con un nombre mal escrito y muestra por qué debe fallar en lugar de caer en local.
3. **Secretos (20 min).** `.env` en `.gitignore` para local, *secrets* del repositorio para el CI. Si se imprimen, se enmascaran con `ocultarSecretos`. Qué hacer si un token llega al repo: revocarlo, no solo borrarlo.
4. **`storageState` (25 min).** Abre `auth.setup.ts` y el archivo JSON que genera: cookies y `localStorage` con el token. Muestra una prueba que arranca con sesión y el grupo que la quita con `storageState: { cookies: [], origins: [] }`.

## Errores comunes

- Subir `playwright/.auth/` al repo: contiene tokens válidos.
- Un ambiente desconocido que cae silenciosamente en local.
- Sesiones que expiran durante corridas largas: el setup debe correr en cada ejecución.

## Respuestas de referencia

1. Porque la suite correría contra el ambiente equivocado y daría resultados falsos (verde en local creyendo que es staging).
2. Guarda cookies y `localStorage` de cada origen. No guarda `sessionStorage`, el estado del servidor ni lo que está en memoria de la página.
3. Para ver las fallas de inmediato mientras desarrollas; un reintento escondería pruebas inestables.
4. Revocar el token de inmediato, avisar al dueño del sistema, revisar si se usó y limpiar el historial si la política lo pide. Borrar el archivo no basta: sigue en el historial.

## Cierre

Reto: conectar `cargarAmbiente` a una copia de la configuración y correr contra el servidor del puerto 3100.
