# Notas del ponente: M3.10 Análisis de causa raíz

## Antes de la clase

- Prepara un defecto escapado real (anonimizado) con su línea de tiempo para el caso.
- Ten un trace con una falla de red y otro con una falla de frontend para comparar.

## Guion de la sesión

1. **Clasificar antes de investigar (20 min).** ¿Prueba, producto o ambiente? Recorre la tabla de preguntas de la guía.
2. **Herramientas (25 min).** Trace (acciones, red, consola), logs del backend con X-Request-Id. Compara los dos traces: en uno la API devuelve 500 (backend), en el otro la API responde bien y la pantalla muestra otra cosa (frontend).
3. **Bugs intermitentes (20 min).** Reproducir con `--repeat-each`, CPU lenta (en DevTools, *Performance* > *CPU throttling*) y red lenta. Anotar la frecuencia antes de investigar.
4. **Caso real (25 min).** Hagan los 5 porqués del defecto escapado. Detén al grupo cuando la acción sea "tener más cuidado" y pide una acción concreta: una prueba, una validación, una alerta o un cambio de proceso.

## Errores comunes

- Confundir el disparador (el deploy del viernes) con la causa raíz (sin prueba de contrato).
- Acciones sin dueño ni fecha.
- No responder por qué la suite no atrapó el defecto.

## Respuestas de referencia

1. Ejemplos: frontend (el botón cambió de texto), backend (la API que habilita el botón respondió error), ambiente (el servicio tardó por carga), prueba (locator ambiguo).
2. Porque un error de red también puede aparecer dentro de un mensaje de aserción; clasificarlo como aserción mandaría a investigar en el lugar equivocado.
3. El disparador es el evento que hizo visible el problema; la causa raíz es la condición que permitió que existiera.

## Cierre

Entregable: RCA de un defecto real de su equipo con la plantilla.
