# M2.16 Severidad, prioridad y cobertura (12 h)

## Objetivo

Decidir qué automatizar, medir si la cobertura alcanza y reportar defectos con la severidad y prioridad correctas.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Severidad vs prioridad, con casos reales |
| 25 min | Matriz de cobertura: requisitos contra pruebas |
| 25 min | Qué automatizar y qué no |
| 20 min | Presentar la cobertura a tu equipo |

## Conceptos clave

| | Severidad | Prioridad |
|---|---|---|
| Qué mide | El impacto técnico del defecto | La urgencia de corregirlo |
| Quién la define | QA | Producto o negocio, con QA |
| Ejemplo alta / baja | El checkout falla con códigos postales que empiezan con 0 (alta severidad) pero casi nadie los usa este mes (prioridad media) | El logo de la página principal está mal escrito (baja severidad, alta prioridad por imagen) |

**Qué automatizar primero:**

| Automatiza | No automatices (o deja para después) |
|---|---|
| Flujos críticos de negocio (login, compra) | Lo que cambia cada semana |
| Lo que se repite en cada regresión | Lo que se prueba una sola vez |
| Validaciones con muchos datos | Lo que necesita juicio humano (diseño visual, usabilidad) |
| Lo que es fácil de preparar por API | Lo que depende de sistemas externos sin ambiente de prueba |

## Plantilla de matriz de cobertura

| Requisito o criterio | Riesgo | Pruebas manuales | Pruebas automatizadas (archivo › prueba) | Nivel (UI/API) | ¿Cubierto? |
|---|---|---|---|---|---|
| Pedido nuevo queda pendiente | Alto | | m2.15 › ejemplo | API | ✓ |
| Transiciones válidas de estado | Alto | | m2.15 › transiciones válidas (5) | API | ✓ |
| El usuario ve el estado actualizado | Medio | | m2.14 › un cambio de estado... | UI | ✓ |
| ... | | | | | |

## Lab (4 h + 8 h de práctica)

Llena la matriz para todo el módulo de pedidos de la tienda usando las pruebas que escribiste
en el Nivel 2. Marca los huecos y prioriza cuáles cubrirías primero y por qué.

## Proyecto 2B

Agrega al framework del proyecto 2A una capa de API: el cliente de pedidos, pruebas data-driven
de las validaciones, las 25 transiciones de estado y al menos 5 pruebas que combinen API y UI.
Entrega la matriz de cobertura del módulo de pedidos y un reporte de un defecto real o simulado
con severidad y prioridad justificadas.

## Preguntas de repaso (preguntas B de Manual QE del examen)

1. Explica la diferencia entre severidad y prioridad con un ejemplo.
2. ¿Cómo sabes que la cobertura de una funcionalidad es suficiente?
3. Describe una situación en la que se te escapó un bug. ¿Qué prueba lo habría detectado?
