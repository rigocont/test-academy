# M1.10 Git en el flujo de pruebas (4 h)

## Objetivo

Trabajar el código de pruebas como se trabaja en un equipo: ramas por tarea, commits pequeños y pull requests revisables.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Qué no se sube: `.gitignore` de un proyecto Playwright |
| 25 min | Commits pequeños y mensajes claros |
| 30 min | Cómo se ve un buen PR de pruebas y cómo se revisa |
| 15 min | Mantener tu rama al día con `git pull` |

## Conceptos clave

El `.gitignore` de este repo deja fuera lo que se genera al correr:

```text
node_modules/
test-results/
playwright-report/
```

**Un buen PR de pruebas:**

- Una sola tarea (un lab, una funcionalidad).
- Descripción con qué se automatizó y cómo correrlo.
- Las pruebas pasan, y se adjunta el reporte o un screenshot.
- Sin `test.only`, `page.pause()` ni `waitForTimeout`.
- Commits que cuentan la historia: "Agregar pruebas de login", "Corregir locator del carrito".

**Al revisar el PR de alguien:** ¿el nombre de cada prueba dice qué valida? ¿Hay aserciones?
¿Los locators son robustos? ¿Se puede correr sola cada prueba?

## Actividad (2.5 h, durante todo el nivel)

Cada lab del Nivel 1 se entrega en su propia rama y su propio PR. Para el proyecto final,
revisa el PR de un compañero con la lista de arriba y deja al menos 3 comentarios.

## Preguntas de repaso (pregunta A de Git del examen)

1. ¿Qué es una rama y por qué se usa?
2. ¿Por qué no se suben `test-results/` ni `playwright-report/`?
