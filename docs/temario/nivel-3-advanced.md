# Nivel 3. Advanced

**Para quién:** QA Mid que ya mantiene un framework y quiere ser dueño de la automatización de su equipo.
**Meta:** diseñar frameworks escalables, integrarlos a CI/CD, definir estrategia y medir su efectividad.
**Horas guiadas:** 150 h (~25 semanas a 6 h/semana) más un proyecto en un sistema real del trabajo.
**Rol al terminar:** QA Sr en automatización.

En este nivel las sesiones en vivo son más de discusión y revisión de diseño que de demo.

## Módulos

| # | Módulo | Temas | En vivo | Lab | Horas |
|---|---|---|---|---|---|
| M3.1 | Arquitectura de un framework | Capas (pruebas, páginas, clientes, datos, utilidades), clean code en pruebas, diseño modular, OOP avanzada (sobrescritura de métodos, clases abstractas, genéricos) | Revisión de arquitecturas reales | Rediseñar el framework del Nivel 2 | 16 h |
| M3.2 | Configuración y ambientes | `projects`, múltiples ambientes (dev, qa, staging), `.env` y secretos, `storageState` para login reutilizable | Un framework, varios ambientes | Correr la misma suite en 2 ambientes | 12 h |
| M3.3 | Escala y estabilidad | Paralelismo, workers, sharding, retries, aislamiento de pruebas, cómo encontrar y eliminar flakiness | Analizar una suite inestable | Bajar el tiempo de una suite y eliminar flaky | 14 h |
| M3.4 | CI/CD | GitHub Actions, correr en cada PR, artefactos (reporte, trace), sharding en CI, quality gates | Pipeline en vivo | Pipeline completo para el framework | 22 h |
| M3.5 | API avanzada | Request builders y validadores propios, validación de esquemas (Zod o AJV), APIs asíncronas con `expect.poll`, contratos | Diseñar validadores | Validar esquemas en toda la suite de API | 16 h |
| M3.6 | Mocking y virtualización | `page.route()`, simular errores y latencia, HAR, cuándo mockear y cuándo no | Probar una UI sin backend | Pruebas de errores con respuestas simuladas | 12 h |
| M3.7 | Seguridad y observabilidad de APIs | Vulnerabilidades comunes (OWASP API Top 10 a nivel de prueba), HATEOAS, distributed tracing y qué buscar en los logs | Cómo detectar un problema que no se ve en el status | Agregar pruebas negativas de auth y permisos | 10 h |
| M3.8 | Estrategia de automatización | Pirámide de pruebas, qué va en UI, API o unit, evitar pruebas redundantes, priorizar por riesgo | Discutir la estrategia de un producto real | Escribir la estrategia de su equipo | 18 h |
| M3.9 | Métricas de efectividad | Cobertura de regresión, tiempo de ejecución, tasa de flakiness, defectos detectados vs escapados | Métricas del TCoE | Dashboard simple con datos de su suite | 10 h |
| M3.10 | Análisis de causa raíz | Distinguir frontend, backend o ambiente, bugs intermitentes, RCA de un defecto escapado | Caso real | RCA documentado de un defecto | 10 h |
| M3.11 | Git avanzado | Ramas de release y hotfix, rebase e interactive rebase, cherry-pick, squash, revert y rollback, el index | Estrategias de ramas | Ejercicios de historial y rollback | 10 h |
| M3.12 | Pruebas visuales (opcional) | `toHaveScreenshot`, umbrales, manejo de diferencias entre ambientes | Cuándo valen la pena | Agregar 5 pruebas visuales | Opcional |

## Proyecto final

**Proyecto en un sistema real del trabajo** (con permiso del equipo): diseñar o mejorar el
framework de automatización de un producto, integrarlo a CI, documentar la estrategia y
presentar métricas antes y después. Se presenta en una sesión de 30 minutos.

## Criterios de salida

La persona puede, liderando dentro de su equipo:

- Diseñar un framework escalable y justificar su arquitectura.
- Integrar la suite a CI/CD con reportes y quality gates.
- Correr la suite en varios ambientes y en paralelo sin flakiness.
- Usar mocks y validación de esquemas donde aportan.
- Escribir y defender una estrategia de automatización basada en riesgo.
- Medir y reportar la efectividad de la automatización.
- Responder las preguntas C de las cuatro áreas como "Competent".
