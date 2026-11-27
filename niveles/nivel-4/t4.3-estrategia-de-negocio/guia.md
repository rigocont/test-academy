# T4.3 Estrategia alineada al negocio

## Objetivo

Hablar de calidad en términos de negocio: alinear la automatización con objetivos y fechas,
tomar decisiones de release con defectos conocidos y reducir la fricción entre QA, Dev y Producto.

## Exposición (30 min)

- **De "cobertura" a "riesgo de negocio":** "el 70 % de los ingresos pasa por checkout y tiene 40 % de
  cobertura de regresión" convence más que "tenemos 1 200 pruebas".
- **Decisión de release con defectos conocidos.** QA no aprueba ni bloquea sola: informa el riesgo para que
  el dueño del producto decida. Formato:

| Defecto | Usuarios afectados | Workaround | Costo de esperar | Recomendación |
|---|---|---|---|---|
| Cupón no aplica en móvil | ~5 % | Usar web | Campaña del viernes se pierde | Release con hotfix en 48 h |

- **Fricción QA-Dev-Producto:** casi siempre viene de expectativas distintas. Acuerdos explícitos:
  definición de "terminado", quién escribe qué pruebas, qué bloquea un merge.
- **Calidad como inversión:** costo de un defecto escapado (soporte, reembolsos, horas de hotfix) vs costo de prevenirlo.

## Caso en grupo (60 min)

Simulación: release el viernes, 3 defectos abiertos. Un participante es PM, otro Dev Lead y otro QA Lead.
Lleguen a una decisión documentada en 20 minutos. Repetir rotando roles.

## Plantilla del entregable: estrategia de calidad de un producto

```markdown
# Estrategia de calidad: <producto>
**Autor:** ... · **Stakeholders:** <PM, Eng Manager, ...> · **Horizonte:** <2 trimestres>

## Objetivos del negocio
Qué quiere lograr el producto este semestre (de su roadmap, no de QA).

## Riesgos de calidad para esos objetivos
| Objetivo | Riesgo | Impacto en el negocio |
|---|---|---|

## Qué hace QA para cada riesgo
| Riesgo | Prevención (diseño, revisión) | Detección (automatización, exploratoria) | Respuesta (monitoreo, rollback) |
|---|---|---|---|

## Política de release
Qué bloquea un release, quién decide con defectos conocidos y cómo se documenta.

## Acuerdos con Dev y Producto
Definición de terminado, responsables por tipo de prueba.

## Métricas que reportaremos al negocio
Máximo 3, con su frecuencia.
```

**Criterio de "Competent":** la estrategia se presentó a los stakeholders y se defendió ante sus preguntas.
