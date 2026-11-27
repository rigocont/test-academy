# Notas del facilitador: T4.1 Testabilidad desde el diseño

## Antes del taller

- Pide a cada participante que traiga el diseño (o la historia épica) de una funcionalidad del próximo trimestre.
- Invita, si se puede, a un arquitecto o SRE para la segunda mitad: el caso mejora mucho con su punto de vista.

## Guion (3 h)

1. **Exposición (30 min).** Las 4 preguntas: controlar, observar, aislar, entender. Usa la tienda como ejemplo: `/api/reiniciar` y `?retraso=` son ganchos de testabilidad; `X-Request-Id` es observabilidad. Pregunta qué labs no existirían sin ellos.
2. **Caso en grupo (60 min).** Grupos de 3. Cada grupo toma un diseño y llena la tabla de diagnóstico (✅/⚠️/❌ por componente). Al final, cada grupo elige las 2 propuestas con mejor relación costo-beneficio.
3. **Presentación y crítica (45 min).** Cada grupo presenta en 8 minutos. El resto hace de arquitecto escéptico: "¿cuánto cuesta?", "¿quién lo mantiene?", "¿qué pasa si no lo hacemos?".
4. **Arranque del entregable (45 min).** Cada quien empieza su propuesta con la plantilla. Recorre los lugares y revisa el diagnóstico.

## Preguntas para provocar la discusión

- ¿Qué prueba de su suite actual es lenta solo porque no hay forma de preparar los datos?
- ¿Cuántas horas de regresión manual se ahorrarían con un endpoint de preparación de datos?
- ¿Qué cosa nunca pueden reproducir en un ambiente de prueba? ¿Qué haría falta?

## Señales de un buen entregable

- Habla del costo de no hacerlo en horas o defectos, no en "calidad".
- Las propuestas son pequeñas y concretas (un endpoint, un header, un flag), no "reescribir el sistema".
- Tiene revisores reales y una sección de acuerdos.

## Seguimiento en la mentoría

Revisa en la sesión 1:1 a quién se presentó la propuesta y qué respondieron. El criterio es que al menos una propuesta se incluya en el diseño.
