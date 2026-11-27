# M3.3 Escala y estabilidad (14 h)

## Objetivo

Bajar el tiempo de la suite con paralelismo y sharding, y encontrar y eliminar pruebas inestables
(flaky) en lugar de esconderlas con reintentos.

## Sesión en vivo (2 h, análisis de una suite inestable)

| Tiempo | Tema |
|---|---|
| 20 min | Workers, `fullyParallel`, `test.describe.configure({ mode })` |
| 20 min | Sharding: `--shard=1/4` y cómo repartir por duración |
| 40 min | En vivo: correr una suite con `--repeat-each=10 --workers=8` y clasificar cada falla |
| 20 min | Las 5 causas de flakiness más comunes y su arreglo |
| 20 min | Política de reintentos y cuarentena |

## Conceptos clave

| Causa de flakiness | Síntoma | Arreglo |
|---|---|---|
| Datos compartidos | Pasa sola, falla en paralelo | Cada prueba crea sus datos con nombre único |
| Esperas fijas | Falla en el CI lento | Aserciones web-first (`toHaveCount`, `toBeVisible`) |
| Orden de la lista | "Pasa casi siempre" | Buscar por contenido, no por posición |
| Carrera con la carga inicial | Falla 1 de 20 veces | Esperar el estado inicial antes de interactuar |
| Dependencia entre pruebas | Falla si cambias el orden | Cada prueba prepara su propio estado |

```bash
npx playwright test --repeat-each=10 --workers=8   # caza flaky antes de subir
npx playwright test --shard=2/4                    # en el CI, una máquina por shard
npx playwright test --last-failed                  # solo lo que falló
```

- **`retries` es una red, no un arreglo.** Una prueba que pasa en el reintento aparece como `flaky`
  en el reporte: trátala como bug.
- **Cuarentena:** una prueba inestable se marca con `test.fixme()` y un ticket con dueño y fecha. Nunca más de 2 semanas.
- **Tasa de flakiness** = pruebas inestables / pruebas con datos. La meta del TCoE es < 2 %.
- `test.step()` hace legible el reporte: dice en qué paso de negocio falló una prueba larga.

## Lab (4 h + 8 h de práctica)

1. Completa `ejercicio.ts` (reparto en shards y clasificación de flaky). `npx playwright test m3.3`.
2. Resuelve `lab.spec.ts`: cada prueba trae comentada su versión inestable. Tu versión debe pasar con
   `npx playwright test m3.3 --repeat-each=5 --workers=4`.
3. **En tu suite real:** córrela con `--repeat-each=10`, clasifica cada falla con la tabla de arriba y
   arregla las 3 más frecuentes. Mide el tiempo antes y después de activar `fullyParallel`.

## Preguntas de repaso

1. ¿Por qué `count()` es peligroso en una aserción y `toHaveCount()` no?
2. ¿Qué pasa con una prueba que usa `test.describe.configure({ mode: 'serial' })` cuando falla la primera?
3. Tu suite tarda 40 min en 1 máquina. ¿Cuántos shards usarías y cómo lo decides?
4. ¿Cuándo SÍ está bien reintentar?
