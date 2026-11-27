# M3.10 Análisis de causa raíz (10 h)

## Objetivo

Ir de "la prueba falló" a "esta es la causa y así evitamos que se repita", distinguiendo si el
problema está en el frontend, el backend, el ambiente o la prueba misma.

## Sesión en vivo (1.5 h, caso real)

| Tiempo | Tema |
|---|---|
| 20 min | Clasificar antes de investigar: ¿prueba, producto o ambiente? |
| 25 min | Herramientas: trace, red, consola, logs del backend con X-Request-Id |
| 20 min | Bugs intermitentes: cómo reproducirlos (`--repeat-each`, CPU lenta, red lenta) |
| 25 min | Caso real: RCA de un defecto que llegó a producción. 5 porqués |

## Conceptos clave

| Pregunta | Si la respuesta es sí, mira... |
|---|---|
| ¿Falla también a mano? | Producto (frontend o backend) |
| ¿La respuesta de la API está mal? (trace > Network) | Backend |
| ¿La API responde bien pero la pantalla no? | Frontend |
| ¿Falla solo en un ambiente o a cierta hora? | Ambiente o datos |
| ¿Pasa al repetirla sin cambiar nada? | La prueba (flaky): M3.3 |

- **5 porqués:** "el pedido salió con total 0" → ¿por qué? el precio llegó vacío → ¿por qué? el catálogo
  cambió el nombre del campo → ¿por qué no lo detectamos? no hay prueba de contrato → acción: esquema en M3.5.
- **La acción de un RCA casi nunca es "tener más cuidado".** Es una prueba, una validación, una alerta o un cambio de proceso.
- **Defecto escapado:** además de la causa del bug, responde por qué la suite no lo atrapó.

## Lab (3 h + 5 h de práctica)

1. Completa `ejercicio.ts` (clasificador de fallas). Corre `npx playwright test m3.10`.
2. Prueba tu clasificador con los mensajes de error de tu última corrida fallida del CI.
3. **Entregable:** el RCA de un defecto real de tu equipo con la [plantilla](plantilla-rca.md).

## Preguntas de repaso

1. Una prueba de UI falla con timeout esperando un botón. Da 3 causas posibles en 3 capas distintas.
2. ¿Por qué el clasificador revisa "red" antes que "aserción"?
3. ¿Qué diferencia hay entre la causa raíz y el disparador?
