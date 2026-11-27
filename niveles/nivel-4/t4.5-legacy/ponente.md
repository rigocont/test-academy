# Notas del facilitador: T4.5 Automatización en sistemas legacy

## Antes del taller

- Pide a un participante que prepare una descripción de 5 minutos de un sistema legacy real: tecnología, cómo se prueba hoy y qué duele.
- Ten un ejemplo de golden master (un reporte o JSON guardado y comparado) para mostrar.

## Guion (3 h)

1. **Exposición (30 min).** Pruebas de caracterización: fijar lo que el sistema hace hoy, aunque esté mal. Costuras para controlar y observar sin tocar el código. Quick wins de las primeras 4 semanas. Golden master y patrón strangler.
2. **Caso en grupo (60 min).** El participante describe su sistema. El grupo propone las 3 primeras costuras, los 5 flujos del humo nocturno y la primera métrica.
3. **Presentación y crítica (45 min).** Comparen las propuestas de cada grupo. ¿Qué costura es la más segura? ¿Cuál requiere permisos que el equipo no tiene?
4. **Arranque del entregable (45 min).** Cada quien empieza el plan de adopción de un sistema legacy de su organización.

## Preguntas para provocar la discusión

- ¿Qué sistema de su organización nadie quiere tocar? ¿Por qué?
- Si solo pudieran automatizar 5 flujos de ese sistema, ¿cuáles serían?
- ¿Qué pasa hoy cuando ese sistema falla en producción? ¿Quién se entera primero?

## Señales de un buen entregable

- Empieza con quick wins medibles en 4 semanas.
- Las costuras incluyen su riesgo.
- Dice qué necesita del equipo dueño del sistema (accesos, datos, ambientes).

## Seguimiento en la mentoría

El criterio es ejecutar la fase 0 y reportar su métrica. Revisa el humo nocturno funcionando en la sesión 1:1.
