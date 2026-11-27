# Notas del facilitador: T4.4 Estándares y gobierno

## Antes del taller

- Pide a cada participante 3 problemas reales que haya visto en PRs de pruebas el último mes.
- Prepara un repo de demostración con branch protection, `CODEOWNERS` y `eslint-plugin-playwright` configurados.

## Guion (3 h)

1. **Exposición (30 min).** Un estándar bueno es corto, justificado y verificable por una máquina. Recorre la tabla de herramientas de GitHub y muestra el repo de demostración: un PR bloqueado por un check, una revisión pedida por `CODEOWNERS` y un error de ESLint por `waitForTimeout`.
2. **Caso en grupo (60 min).** Junten los problemas de PR de todos. Clasifíquenlos en tres columnas: se resuelve con estándar, con herramienta o con capacitación. Para los de herramienta, escriban la regla exacta.
3. **Presentación y crítica (45 min).** Cada grupo presenta sus 5 reglas principales. El resto pregunta "¿cómo se verifica?" y "¿cuál es el proceso de excepción?".
4. **Arranque del entregable (45 min).** Cada quien empieza su propuesta de estándar con la plantilla.

## Preguntas para provocar la discusión

- ¿Qué regla de su equipo nadie cumple? ¿Por qué?
- ¿Qué se revisa a mano en cada PR que podría revisar una máquina?
- ¿Quién puede cambiar hoy los secrets o los workflows de su repo?

## Señales de un buen entregable

- Cada regla dice por qué existe y cómo se verifica.
- Al menos 3 reglas verificadas automáticamente.
- Proceso de excepción con vencimiento e historial de cambios.

## Seguimiento en la mentoría

El criterio es tener al menos 3 reglas verificadas en un repo real. Revisa el repo en la sesión 1:1.
