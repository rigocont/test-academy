# Notas del ponente: M3.4 CI/CD

## Antes de la clase

- Ten un repo de práctica tuyo con `plantilla-ci.yml` ya funcionando y una corrida reciente con reporte publicado.
- Prepara un commit que rompa una prueba para provocar una falla en vivo (el CI tarda unos minutos: lánzalo al inicio de la sesión).

## Guion de la sesión

1. **Anatomía de un workflow (20 min).** `on`, `jobs`, `steps`, `matrix` y `needs`, sobre el workflow del repo (`.github/workflows/verificar-material.yml`).
2. **Pipeline en vivo (30 min).** Recorre la pestaña Actions: la corrida, los logs de cada paso, los artefactos.
3. **Sharding y reportes unidos (30 min).** Recorre `plantilla-ci.yml`: 4 shards con `--reporter=blob`, un job final con `merge-reports`. Explica `fail-fast: false` e `if: ${{ !cancelled() }}`.
4. **Artefactos (20 min).** Descarga el reporte HTML del CI y abre el trace de una falla en trace.playwright.dev.
5. **Quality gates (20 min).** Qué bloquea un merge: checks *required* en branch protection. Discutan qué reglas pondrían en su equipo.
6. **Falla que solo pasa en el CI (30 min).** Usa la tabla "Por qué falla en el CI y no en mi máquina". Revisa la falla provocada al inicio sin correr nada en local.

## Errores comunes

- No subir el reporte cuando hay fallas (falta `!cancelled()`).
- Secrets con otro nombre en el CI que en local.
- Instalar todos los navegadores cuando la suite usa uno solo: tarda minutos de más.

## Respuestas de referencia

1. Porque `needs` solo corre si todos los jobs anteriores pasaron; con `!cancelled()` corre aunque haya fallas, que es cuando más se necesita el reporte.
2. No gastar minutos de CI ni hacer esperar a nadie por commits viejos del mismo PR.
3. Required: humo y regresión de lo que toca el PR, rápidas y estables. No required: suites largas, nocturnas o de navegadores extra.
4. Diferencias de ambiente: zona horaria, datos que cambian por la tarde, carga del servidor compartido o un job programado que modifica datos.

## Cierre

Entregable: PR con el pipeline en verde, reporte publicado y el script de quality gate.
