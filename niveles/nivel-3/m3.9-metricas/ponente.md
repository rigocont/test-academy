# Notas del ponente: M3.9 Métricas de efectividad

## Antes de la clase

- Prepara un ejemplo de dashboard (hoja de cálculo) con 2 semanas de datos de una suite.
- Ten el reporter de ejemplo de la guía (`reporter-metricas.ts`) listo para correrlo.

## Guion de la sesión

1. **Métricas del TCoE (20 min).** Cobertura de regresión, tiempo de la suite (p50 y p95), tasa de flakiness y defectos detectados vs escapados. Para cada una: cómo se calcula y qué decisión permite tomar.
2. **Reporters (25 min).** `onBegin`, `onTestEnd`, `onEnd`. Muestra que `onTestEnd` llega una vez por intento: una prueba reintentada llega dos veces. Conecta el reporter y corre `npm run test:nivel3`.
3. **Métricas que engañan (25 min).** "Tenemos 2 000 pruebas", "98 % de éxito", "cobertura de código del 90 %". Para cada una, el grupo busca cómo podría ser verdad y la calidad seguir mala.
4. **Un dashboard simple (20 min).** Qué mostrar a quién: el equipo ve flaky y tiempos; la dirección ve defectos escapados y tiempo de regresión.

## Errores comunes

- Contar intentos en lugar de pruebas.
- Mostrar 15 métricas: nadie decide nada.
- Usar métricas para comparar personas.

## Respuestas de referencia

1. Porque Playwright llama al reporter por cada intento; con `retries`, una prueba que falla y pasa en el reintento llega dos veces.
2. Porque mide si las pruebas pasan, no si prueban lo importante: una suite que no valida nada tiene 100 % de éxito.
3. A la dirección: defectos escapados y tiempo de regresión (impacto en el negocio). Al equipo: flakiness y tiempo de la suite (lo que pueden mejorar esta semana).

## Cierre

Entregable: dashboard con 4 métricas de su suite real durante 2 semanas y una conclusión de 3 líneas.
