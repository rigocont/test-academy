# T4.5 Automatización en sistemas legacy

## Objetivo

Introducir automatización en un sistema que nadie quiere tocar: sin pruebas, sin API, con datos
difíciles de preparar y con miedo a romperlo.

## Exposición (30 min)

- **Empieza por fuera:** pruebas de caracterización (*characterization tests*) que fijan lo que el sistema
  hace HOY, aunque esté mal. Primero se protege, después se cambia.
- **Busca las costuras (*seams*):** dónde puedes observar o controlar sin cambiar el código. Base de datos,
  archivos de intercambio, una API interna, la UI como último recurso.
- **Priorización:** los flujos que más dinero mueven y que más cambian. Un flujo que nadie toca no necesita prueba hoy.
- **Quick wins (primeras 4 semanas):**
  1. Humo de 5 pruebas en UI que corre cada noche y avisa en el canal del equipo.
  2. Script de preparación de datos (aunque sea SQL) para dejar de depender de datos "que alguien creó".
  3. Una prueba por cada defecto escapado nuevo.
- **Golden master:** guardar la salida completa (un reporte, un PDF, un JSON) y compararla en cada cambio.
  Útil cuando no sabes qué es "correcto", solo qué es "lo de siempre".
- **Patrón strangler:** cuando el sistema se migra por partes, las pruebas de punta a punta son las que
  garantizan que el usuario no nota la migración.

## Caso en grupo (60 min)

Un participante describe un sistema legacy real. El grupo propone: las 3 primeras costuras, los 5 flujos
del humo y la primera métrica que se reportará.

## Plantilla del entregable: plan de adopción para un sistema legacy

```markdown
# Plan de automatización: <sistema legacy>
**Autor:** ... · **Equipo dueño del sistema:** ... · **Fecha:** ...

## Situación actual
Tecnología, cómo se prueba hoy, cuánto tarda la regresión, defectos escapados del último semestre.

## Costuras disponibles
| Costura | Qué permite controlar u observar | Riesgo de usarla |
|---|---|---|

## Flujos priorizados
| Flujo | Valor de negocio | Frecuencia de cambio | Prioridad |
|---|---|---|---|

## Fases
| Fase | Duración | Entregable | Métrica |
|---|---|---|---|
| 0. Quick wins | 4 semanas | Humo nocturno | Defectos atrapados antes de producción |
| 1. Caracterización | | | |
| 2. Regresión | | | |

## Necesidades del equipo dueño
Accesos, ambientes, datos, cambios mínimos de testabilidad (T4.1).

## Riesgos
```

**Criterio de "Competent":** la fase 0 se ejecutó y su métrica se reportó.
