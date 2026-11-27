# Notas del facilitador: T4.6 Calidad más allá de lo funcional

## Antes del taller

- Instala k6 y corre `ejemplo-k6.js` contra la tienda. El umbral de productos falla a propósito (la API tarda 600 ms): úsalo en la demo.
- Pide que los participantes instalen k6 antes del taller o prepárales una máquina compartida.

## Guion (3 h)

1. **Exposición (30 min).** Performance con k6 (escenarios, umbrales, tipos de prueba), contract testing con Pact, seguridad (qué le toca a QA y qué no), accesibilidad con axe. Termina con el método de evaluación de herramientas.
2. **Caso en grupo (60 min).** Corran `ejemplo-k6.js`, lean el resultado (p95, tasa de errores, umbrales) y cambien el umbral de productos para que pase. Luego suban los usuarios virtuales hasta encontrar el punto en que el p95 se dispara.
3. **Discusión (45 min).** ¿Quién debería ser dueño de las pruebas de performance en su organización? ¿Qué herramienta evaluarían y con qué criterios? Escriban los criterios con peso antes de nombrar herramientas.
4. **Arranque del entregable (45 min).** Cada quien empieza su evaluación comparativa con la plantilla.

## Preguntas para provocar la discusión

- ¿Han elegido una herramienta porque "todos la usan"? ¿Cómo salió?
- ¿Qué cuesta salir de la herramienta que usan hoy?
- ¿Qué defecto de producción habría detectado una prueba de contrato?

## Señales de un buen entregable

- Los criterios y sus pesos se definieron antes de la prueba de concepto.
- Todas las candidatas se probaron con el mismo caso real y el mismo tiempo.
- Incluye el costo total: licencias, aprendizaje, mantenimiento y salida.

## Seguimiento en la mentoría

El criterio es que la evaluación termine en una decisión documentada, aunque sea descartar todas las opciones.
