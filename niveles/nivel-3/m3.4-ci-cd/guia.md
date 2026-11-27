# M3.4 CI/CD (22 h)

## Objetivo

Que la suite corra sola en cada PR, en paralelo, con un reporte que cualquiera pueda abrir y con
reglas claras de cuándo bloquea un merge.

## Sesión en vivo (2.5 h, pipeline en vivo)

| Tiempo | Tema |
|---|---|
| 20 min | Anatomía de un workflow: `on`, `jobs`, `steps`, `matrix`, `needs` |
| 30 min | En vivo: el workflow de este repo (`.github/workflows/verificar-material.yml`) |
| 30 min | Sharding en el CI y unir reportes con `merge-reports` |
| 20 min | Artefactos: reporte HTML, traces, JUnit para otras herramientas |
| 20 min | Quality gates y branch protection: qué bloquea un merge |
| 30 min | Depurar una falla que solo pasa en el CI |

## Conceptos clave

- **Plantilla completa:** [`plantilla-ci.yml`](plantilla-ci.yml). Corre 4 shards en paralelo, sube un
  reporte parcial por shard y un último job los une en un solo HTML.
- **`fail-fast: false`** para ver todas las fallas, no solo las del primer shard que falla.
- **`if: ${{ !cancelled() }}`** para subir el reporte también cuando hay fallas (que es cuando más lo necesitas).
- **`concurrency` con `cancel-in-progress`** para no gastar minutos en commits viejos del mismo PR.
- **Formatos del reporte:** `html` para personas, `json` para scripts (como el quality gate) y `junit` para
  herramientas como Jira/Xray o Azure DevOps.
- **Trace:** con `trace: 'retain-on-failure'` (o `'on-first-retry'`) el reporte incluye el trace de cada
  falla. Descárgalo y ábrelo con `npx playwright show-trace trace.zip` o en trace.playwright.dev.
- **Quality gate:** una regla que bloquea el merge. Ejemplos: 0 pruebas fallidas, flaky < 2 %,
  la suite de humo termina en < 10 min. Se activa en *Settings > Branches > Branch protection*
  marcando el job como *required*.
- **Cuándo correr qué:**

| Disparador | Qué corre | Tiempo objetivo |
|---|---|---|
| Cada PR | Humo + pruebas del área cambiada | < 10 min |
| Merge a main | Regresión completa | < 30 min |
| Nocturno | Regresión en todos los navegadores y ambientes | sin límite |

## Por qué falla en el CI y no en mi máquina

| Diferencia | Qué revisar |
|---|---|
| CPU más lenta | Esperas fijas, timeouts muy cortos |
| Base de datos limpia | La prueba asume datos que solo existen en tu máquina |
| Zona horaria y locale (UTC, en-US) | Fechas y formatos de moneda |
| Sin pantalla, otra resolución | `viewport` en la config, no el tamaño de tu monitor |
| Variables y secretos | El secret no existe o tiene otro nombre |

## Lab (5 h + 12 h de práctica)

1. Lee el workflow de este repo y explica en voz alta cada paso.
2. Copia `plantilla-ci.yml` a tu repo del framework (Nivel 2), ajústalo y haz que corra en cada PR.
3. Escribe `scripts/quality-gate.mjs`: lee `resultados.json` (reporter `json`), toma `stats.expected`,
   `stats.unexpected` y `stats.flaky`, y termina con `process.exit(1)` si hay fallidas o si las inestables
   pasan del porcentaje de `--max-flaky`.
4. Rompe una prueba a propósito, descarga el trace del CI y encuentra la falla sin correr nada en local.

**Entregable:** link al PR con el pipeline en verde y el reporte HTML publicado como artefacto.

## Preguntas de repaso

1. ¿Por qué el job de reporte usa `needs` y `!cancelled()` en lugar de solo `needs`?
2. ¿Qué gana tu equipo con `cancel-in-progress`?
3. ¿Qué pruebas pondrías como *required* para el merge y cuáles no?
4. Una prueba falla solo en el CI a las 6 p. m. ¿Qué sospechas primero?
