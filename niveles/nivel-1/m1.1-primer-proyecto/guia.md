# M1.1 Primer proyecto Playwright (6 h)

## Objetivo

Crear un proyecto de Playwright desde cero, entender sus archivos y correr pruebas en varios navegadores.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 15 min | Qué es Playwright y qué lo hace distinto (auto-waiting, varios navegadores, API y UI) |
| 30 min | Demo: `npm init playwright@latest` en una carpeta vacía |
| 25 min | Recorrido por `playwright.config.ts` y la carpeta `tests/` |
| 20 min | Correr en terminal, `--headed` y `--ui` |

## Conceptos clave

```text
mi-proyecto/
├── playwright.config.ts   ← configuración: navegadores, baseURL, reportes, timeouts
├── tests/
│   └── ejemplo.spec.ts    ← las pruebas (archivos que terminan en .spec.ts)
└── package.json
```

En `playwright.config.ts` de este repo fíjate en:

| Opción | Qué hace |
|---|---|
| `baseURL` | Permite escribir `page.goto('/')` en lugar de la URL completa |
| `projects` | Cada proyecto es un grupo de pruebas con su configuración (aquí `nivel-0` y `nivel-1`) |
| `webServer` | Levanta la tienda de práctica antes de correr las pruebas |
| `trace`, `screenshot` | Qué evidencia guardar cuando una prueba falla |

```bash
npx playwright test                    # todas
npx playwright test m1.1               # solo los archivos que coinciden con "m1.1"
npx playwright test --headed           # viendo el navegador
npx playwright test --ui               # modo UI: elige, corre y ve cada paso
npx playwright test --project=nivel-1  # un proyecto
```

## Lab (4 h)

1. En una carpeta aparte (fuera de este repo) crea un proyecto con `npm init playwright@latest`.
   Acepta TypeScript y la carpeta `tests`. Corre las pruebas de ejemplo en los 3 navegadores.
2. En este repo corre `npx playwright test m1.1 --headed` y lee las dos pruebas hechas.
3. Resuelve el `TODO` de `lab.spec.ts`.

## Preguntas de repaso

1. ¿Para qué sirve `baseURL`?
2. ¿Qué diferencia hay entre correr en modo headless y `--headed`?
3. ¿Qué hace `webServer` en la configuración?

## Para el instructor

- Si `npx playwright install` falla por proxy corporativo, ten listo el comando con `HTTPS_PROXY`.
