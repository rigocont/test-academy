# T4.1 Testabilidad desde el diseño

## Objetivo

Influir en la arquitectura de un sistema antes de que se construya, para que sea fácil de probar
y para prevenir defectos en lugar de encontrarlos.

## Exposición (30 min)

- **Las 4 preguntas de testabilidad:** ¿puedo **controlar** el estado? ¿puedo **observar** el resultado?
  ¿puedo **aislar** el componente? ¿puedo **entender** por qué falló?
- **Señales de un sistema poco testeable:** sin API para crear datos, IDs aleatorios en la UI, fechas
  del reloj del sistema, dependencias externas sin forma de simularlas, sin logs con id de correlación.
- **Lo que QA pide en una revisión de diseño:** endpoints de preparación de datos (solo en ambientes de
  prueba), `data-testid` o roles accesibles, feature flags, reloj inyectable, contratos publicados (OpenAPI),
  health checks y trazas.
- **Trabajar con arquitectos y SRE:** llegar con un costo concreto ("la regresión de pagos tarda 2 días porque
  no podemos crear un pedido pagado sin pasar por la pasarela").

Ejemplo en la tienda de práctica: `POST /api/reiniciar` y `?retraso=` en productos son ganchos de
testabilidad. `X-Request-Id` es observabilidad. Sin ellos, varios labs no serían posibles.

## Caso en grupo (60 min)

Toma el diseño de una funcionalidad que tu equipo construirá el próximo trimestre. Responde las 4
preguntas para cada componente y lista lo que pedirías.

## Plantilla del entregable: propuesta de testabilidad

```markdown
# Propuesta de testabilidad: <sistema o funcionalidad>
**Autor:** ... · **Revisores:** <arquitecto, dev lead, SRE> · **Fecha:** ...

## Contexto
Qué se va a construir y en qué etapa está el diseño.

## Diagnóstico
| Componente | Controlar | Observar | Aislar | Entender | Problema principal |
|---|---|---|---|---|---|
| | ✅/⚠️/❌ | | | | |

## Propuestas
| # | Cambio propuesto | Problema que resuelve | Costo estimado | Beneficio (horas de prueba, defectos evitados) |
|---|---|---|---|---|

## Qué pasa si no se hace
Costo concreto en tiempo de regresión, riesgo o defectos.

## Acuerdos
Qué aceptó el equipo, quién lo hace y cuándo.
```

**Criterio de "Competent":** al menos una propuesta fue aceptada e incluida en el diseño.
