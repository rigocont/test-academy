# Notas del ponente: M1.6 Ejecutar y leer resultados

## Antes de la clase

- En una rama aparte, prepara las 3 roturas de la guía: botón "Ingresar", mensaje de bloqueado cambiado y precio de la Taza térmica cambiado.
- Corre la suite rota una vez para tener el reporte HTML y los traces listos por si algo falla en vivo.

## Guion de la sesión

1. **Línea de comandos (20 min).** `-g`, `--project`, `--headed --workers=1`, `--last-failed`. Pide que corran solo las pruebas de carrito con `-g`.
2. **El reporte HTML (25 min).** `npm run reporte`: filtros, pasos de cada prueba, screenshot, video si lo hubiera y trace. Abre un trace y recorre la línea de tiempo, la red y la consola.
3. **Tres fallas distintas (30 min).** Una rotura a la vez. Para cada una, lee el error con el grupo usando la tabla de la guía y decide: ¿bug de la app o de la prueba? El botón renombrado es discutible: si el cambio fue a propósito, se actualiza la prueba.
4. **Reportar el bug (15 min).** Escriban juntos el reporte del precio: pasos, esperado, obtenido, evidencia (screenshot y trace adjuntos), ambiente y versión.

## Errores comunes

- Leer solo la última línea del error. La información útil suele estar en el *call log*.
- Concluir "bug de la app" sin abrir el trace.
- Olvidar revertir los cambios a la app después de la actividad.

## Respuestas de referencia

1. Cada acción con su antes y después, la red, la consola, los locators usados y el tiempo de cada paso.
2. El locator encontró más de un elemento y Playwright no sabe a cuál dirigirse; hay que hacerlo más específico.
3. Pasos para reproducir, resultado esperado y obtenido, evidencia (screenshot, trace, logs), ambiente y la prueba que lo detectó.

## Cierre

Revierte los cambios a la app al terminar. La actividad se hace en una rama aparte que no se mezcla.
