# Nivel 3. Advanced

Material de clase del [temario del Nivel 3](../../docs/temario/nivel-3-advanced.md).
En este nivel pasas de mantener un framework a **ser dueño de la automatización**: arquitectura,
ambientes, CI, estabilidad, estrategia y métricas. Las sesiones en vivo son más de discusión y
revisión de diseño que de demo.

Los labs reutilizan las partes completas del framework del Nivel 2 (`obtenerToken`, `clienteUnico`,
`nuevoPedido`) y la tienda de práctica, que en este nivel agrega:

- `POST /api/reportes`: API asíncrona (responde 202 y termina ~1.5 s después).
- Header `X-Request-Id` en todas las respuestas (`LOG_PETICIONES=1 npm run app` lo imprime en el log).
- Mensaje de error en productos cuando la API falla (para practicar mocking).

## Antes de empezar

```bash
npm install                     # instala zod (nuevo en este nivel)
npm run test:nivel3             # todo el nivel
npx playwright test m3.5 --ui   # un módulo en modo UI
```

El proyecto `nivel-3-setup` inicia sesión una sola vez y guarda el estado en `playwright/.auth/`
(ver [M3.2](m3.2-configuracion-y-ambientes/guia.md)). Corre solo antes de las pruebas del nivel.

## Módulos

| # | Módulo | Horas | Guía | Lab |
|---|---|---|---|---|
| M3.1 | Arquitectura de un framework | 16 h | [guía](m3.1-arquitectura/guia.md) | `ejercicio.ts` y rediseño del framework |
| M3.2 | Configuración y ambientes | 12 h | [guía](m3.2-configuracion-y-ambientes/guia.md) | `ejercicio.ts` y `lab.spec.ts` |
| M3.3 | Escala y estabilidad | 14 h | [guía](m3.3-escala-y-estabilidad/guia.md) | `ejercicio.ts` y suite inestable |
| M3.4 | CI/CD | 22 h | [guía](m3.4-ci-cd/guia.md) | [`plantilla-ci.yml`](m3.4-ci-cd/plantilla-ci.yml) en tu repo |
| M3.5 | API avanzada | 16 h | [guía](m3.5-api-avanzada/guia.md) | `esquemas.ts` y `lab.spec.ts` |
| M3.6 | Mocking y virtualización | 12 h | [guía](m3.6-mocking/guia.md) | `lab.spec.ts` |
| M3.7 | Seguridad y observabilidad | 10 h | [guía](m3.7-seguridad-y-observabilidad/guia.md) | `lab.spec.ts` |
| M3.8 | Estrategia de automatización | 18 h | [guía](m3.8-estrategia/guia.md) | [plantilla de estrategia](m3.8-estrategia/plantilla-estrategia.md) |
| M3.9 | Métricas de efectividad | 10 h | [guía](m3.9-metricas/guia.md) | `ejercicio.ts` y dashboard |
| M3.10 | Análisis de causa raíz | 10 h | [guía](m3.10-causa-raiz/guia.md) | `ejercicio.ts` y [plantilla de RCA](m3.10-causa-raiz/plantilla-rca.md) |
| M3.11 | Git avanzado | 10 h | [guía](m3.11-git-avanzado/guia.md) | `preparar-practica.mjs` |
| M3.12 | Pruebas visuales (opcional) | — | [guía](m3.12-pruebas-visuales/guia.md) | En tu framework |

## Entregables del nivel

| Módulo | Entregable |
|---|---|
| M3.1 | Diagrama de capas de tu framework y PR con las dependencias corregidas |
| M3.3 | Suite real con `--repeat-each=10` en verde y tiempo antes/después |
| M3.4 | Pipeline en verde con reporte publicado y quality gate |
| M3.8 | Estrategia de automatización de tu equipo |
| M3.9 | Dashboard con 4 métricas de 2 semanas |
| M3.10 | RCA de un defecto real |

## Proyecto final

Diseña o mejora el framework de un producto real de tu trabajo (con permiso del equipo), intégralo al
CI, documenta la estrategia (M3.8) y presenta métricas antes y después (M3.9) en una sesión de 30 minutos.

**Rúbrica:**

| Criterio | Peso | "Competent" significa |
|---|---|---|
| Arquitectura | 20 % | Capas claras, sin dependencias cruzadas, fácil agregar una prueba |
| CI/CD | 20 % | Corre en cada PR, en paralelo, con reporte y quality gate |
| Estabilidad | 15 % | Flakiness < 2 % medida con repeticiones |
| Estrategia | 20 % | Basada en riesgo, con capas justificadas |
| Métricas | 15 % | Antes y después, con una conclusión accionable |
| Presentación | 10 % | Se entiende para alguien fuera del equipo |
