# Estrategia de automatización: <producto>

**Autor:** <nombre> · **Equipo:** <equipo> · **Fecha:** <fecha> · **Revisión siguiente:** <fecha + 3 meses>

## 1. Contexto

- Qué hace el producto y quién lo usa (2 o 3 líneas).
- Frecuencia de releases y cómo se prueba hoy.
- Problema principal que esta estrategia resuelve (ej. "la regresión manual tarda 3 días").

## 2. Objetivos medibles

| Métrica | Hoy | Meta en 3 meses | Meta en 6 meses |
|---|---|---|---|
| Cobertura de regresión automatizada | | | |
| Tiempo de la suite en el CI | | | |
| Tasa de flakiness | | | < 2 % |
| Defectos escapados a producción por release | | | |

## 3. Matriz de riesgo

| Flujo o módulo | Impacto (1-5) | Probabilidad de fallar (1-5) | Riesgo | Prioridad |
|---|---|---|---|---|
| | | | | |

## 4. Qué se prueba en cada capa

| Capa | Qué cubre | Quién la escribe | Cuándo corre |
|---|---|---|---|
| Unit / componente | | Devs | Cada commit |
| API | | QA | Cada PR |
| UI E2E | Solo flujos críticos: | QA | Cada PR (humo) y nocturno (completa) |
| Manual / exploratoria | | QA | Cada release |

## 5. Qué NO se automatiza y por qué

-

## 6. Herramientas y ambientes

- Framework, lenguaje, repositorio.
- Ambientes donde corre y datos de prueba (cómo se crean y limpian).
- CI: disparadores y quality gates.

## 7. Riesgos de la estrategia y mitigación

| Riesgo | Mitigación |
|---|---|
| | |

## 8. Plan por fases

| Fase | Alcance | Fecha |
|---|---|---|
| 1 | | |
| 2 | | |
