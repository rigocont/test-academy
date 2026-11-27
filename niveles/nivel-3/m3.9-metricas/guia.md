# M3.9 Métricas de efectividad (10 h)

## Objetivo

Medir si la automatización está funcionando y comunicarlo con pocos números que el equipo entienda.

## Sesión en vivo (1.5 h, métricas del TCoE)

| Tiempo | Tema |
|---|---|
| 20 min | Las métricas del año 1 del TCoE y cómo se calculan |
| 25 min | Reporters de Playwright: de dónde sacar los datos |
| 25 min | Métricas que engañan (vanity metrics) |
| 20 min | Un dashboard simple: qué mostrar y a quién |

## Conceptos clave

| Métrica | Cómo se calcula | Qué dice |
|---|---|---|
| Cobertura de regresión | Casos de regresión automatizados / casos de regresión totales | Cuánto trabajo manual queda |
| Tiempo de la suite | Duración en el CI (p50 y p95) | Si el feedback llega a tiempo |
| Tasa de flakiness | Pruebas inestables / pruebas ejecutadas | Si el equipo puede confiar en un rojo |
| Tasa de éxito | (pasaron + inestables) / total | Salud de la suite (no del producto) |
| Defectos detectados vs escapados | Bugs atrapados por la suite / bugs que llegaron a producción | Si la suite prueba lo que importa |

- **Métrica que engaña:** "tenemos 2 000 pruebas". No dice nada si 400 son redundantes y 100 están en `fixme`.
- **Un reporter propio** recibe cada resultado (`onTestEnd`) y al final (`onEnd`) puede escribir un JSON,
  mandar un mensaje a Slack o subir los datos a un dashboard.

```ts
// reporter-metricas.ts
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { writeFileSync } from 'node:fs';
import { ReporterMetricas } from './niveles/nivel-3/m3.9-metricas/ejercicio';

export default class implements Reporter {
  private metricas = new ReporterMetricas();
  onTestEnd(test: TestCase, result: TestResult) { this.metricas.onTestEnd(test, result); }
  onEnd() { writeFileSync('metricas.json', JSON.stringify(this.metricas.resumen(), null, 2)); }
}
// playwright.config.ts → reporter: [['list'], ['./reporter-metricas.ts']]
```

## Lab (3 h + 5 h de práctica)

1. Completa `ejercicio.ts`. Corre `npx playwright test m3.9`.
2. Conecta tu `ReporterMetricas` a un reporter real como en el ejemplo y corre `npm run test:nivel3`.
3. **Entregable:** un dashboard simple (hoja de cálculo o HTML) con 4 métricas de tu suite real durante
   2 semanas, y una conclusión de 3 líneas.

## Preguntas de repaso

1. ¿Por qué `onTestEnd` puede llegar dos veces para la misma prueba?
2. ¿Por qué la tasa de éxito no dice nada de la calidad del producto?
3. ¿Qué métrica le mostrarías a tu director y cuál a tu equipo?
