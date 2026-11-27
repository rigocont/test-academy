# Temario por nivel

Cada nivel tiene su propio archivo con objetivos, módulos, horas, qué se ve en vivo y qué
en lab, el proyecto final y los criterios de salida. Las habilidades vienen de la
[matriz de competencias](../00-matriz-competencias.md).

| Nivel | Archivo | Horas guiadas | Duración a 6 h/semana |
|---|---|---|---|
| 0. Bases | [nivel-0-bases.md](nivel-0-bases.md) | 80 h | ~14 semanas |
| 1. Beginner | [nivel-1-beginner.md](nivel-1-beginner.md) | 90 h | ~15 semanas |
| 2. Intermediate | [nivel-2-intermediate.md](nivel-2-intermediate.md) | 200 h (2A + 2B) | ~34 semanas |
| 3. Advanced | [nivel-3-advanced.md](nivel-3-advanced.md) | 150 h + proyecto real | ~25 semanas |
| 4. Expert | [nivel-4-expert.md](nivel-4-expert.md) | Mentoría | 6 meses |

## Formato mixto

Cada semana estándar de 6 horas se reparte así:

| Bloque | Horas | Qué pasa |
|---|---|---|
| Sesión en vivo | 1.5 h | Concepto, demo en vivo y dudas. Se graba. |
| Lab autoguiado | 4 h | Ejercicios del repo con instrucciones y pruebas que validan la solución. |
| Revisión | 0.5 h | Pull request del lab revisado por el instructor o un compañero. |

Todo el trabajo de los alumnos se entrega como pull request. Así practican Git desde el
Nivel 0 y el instructor revisa código como se hace en un equipo real.

## Horas guiadas vs horas del framework

El framework estima las horas **con práctica en proyecto real**. Las horas guiadas de aquí
son las que la academia da con sesiones y labs. La diferencia se cubre aplicando lo
aprendido en el trabajo diario, sobre todo en los Niveles 2 y 3.

## Aplicación de práctica

Los labs de los Niveles 0 y 1 usan la **tienda de práctica del repo** (`app/`): login, productos,
carrito, checkout, una página lenta a propósito y una API REST. Así los labs no dependen de
sitios externos y los datos están bajo control. Playwright la levanta solo al correr las pruebas.

Para los Niveles 2 en adelante se puede ampliar la tienda o sumar sitios públicos de práctica
como `the-internet.herokuapp.com` (diálogos, iframes, archivos) y `restful-booker.herokuapp.com` (API con auth).

## Decisiones aplicadas de la matriz (sección 6)

1. Las horas de Git fuera de Beginner son propuesta de la academia.
2. Seguridad básica de APIs y observabilidad entran al Nivel 3, para que las preguntas C de API tengan temario.
3. Merge queda en Nivel 2 y rebase en Nivel 3.
4. Data-driven y keyword-driven se cubren en el Nivel 2.
5. Performance y seguridad a fondo quedan como especialización fuera de esta ruta. El Nivel 4 da una introducción.
