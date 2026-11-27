# M2.15 Diseño de pruebas aplicado (18 h)

## Objetivo

Derivar las pruebas de los criterios de aceptación con técnicas formales, en lugar de improvisarlas.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Valores límite y particiones de equivalencia (repaso con M2.13) |
| 25 min | Transición de estados |
| 25 min | Tablas de decisión |
| 20 min | De la historia de usuario a la lista de pruebas |

## Conceptos clave

| Técnica | Cuándo | Cómo |
|---|---|---|
| Particiones de equivalencia | Rangos o grupos de valores que se comportan igual | Una prueba por grupo |
| Valores límite | Rangos con mínimo y máximo | Probar justo antes, en y justo después de cada límite |
| Tabla de decisión | El resultado depende de combinar condiciones | Una columna por combinación |
| Transición de estados | El objeto pasa por estados con reglas | Probar cada transición válida y las inválidas importantes |

**Diagrama de estados del pedido** (complétalo en tu PR):

```text
           pagar            enviar            entregar
pendiente ───────▶ pagado ───────▶ enviado ───────▶ entregado
    │                 │
    │ cancelar        │ cancelar
    ▼                 ▼
 cancelado ◀──────────┘
```

**Tabla de transiciones** (llénala antes de programar):

| De \ A | pendiente | pagado | enviado | entregado | cancelado |
|---|---|---|---|---|---|
| pendiente | ✗ | ✓ | | | |
| pagado | | | | | |
| enviado | | | | | |
| entregado | | | | | |
| cancelado | | | | | |

Con 5 estados hay 25 combinaciones: 5 válidas y 20 inválidas. Con datos y un ciclo, son 25 pruebas
escritas una sola vez.

## Lab (4 h + 14 h de práctica)

1. Completa el diagrama y la tabla en tu PR.
2. Resuelve las 3 pruebas pendientes de `lab.spec.ts` generando una prueba por fila de tu tabla.
3. Toma una historia de usuario real de tu equipo y entrega su lista de pruebas con la técnica usada en cada una.

## Preguntas de repaso (preguntas B de Manual QE del examen)

1. ¿Cómo aseguras que la cobertura de una funcionalidad es suficiente?
2. ¿Cuántas pruebas necesitas para un campo que acepta de 1 a 10? ¿Cuáles?
