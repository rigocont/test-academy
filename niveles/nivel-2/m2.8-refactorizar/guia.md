# M2.8 Leer y refactorizar código ajeno (8 h)

## Objetivo

Reconocer problemas en código de pruebas heredado y mejorarlo sin cambiar lo que valida.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 25 min | Code smells en pruebas |
| 25 min | Refactorizar con seguridad: primero que pase, después mejorar, volver a correr |
| 30 min | Revisión de un PR en vivo |
| 10 min | Cómo dar comentarios de revisión útiles |

## Conceptos clave

| Code smell | Síntoma | Solución |
|---|---|---|
| Nombres vacíos | `test1`, `prueba login 2` | El nombre dice el resultado esperado |
| Prueba gigante | Valida 5 cosas; si falla la primera no sabes de las otras | Una prueba por comportamiento |
| Setup copiado | El mismo login en cada prueba | Fixture |
| Locators de estructura | `ul li:nth-child(4) button` | Page Object con locators por rol |
| Esperas fijas | `waitForTimeout(1000)` | Web-first assertions |
| Aserciones que no esperan | `expect(await x.textContent())` | `await expect(x).toHaveText()` |
| Datos mágicos | Números y textos sin explicación | Nombres explícitos o constantes |
| URL a mano | `'http://localhost:' + ...` | `baseURL` |

**Refactorizar con seguridad:**

1. Corre las pruebas y confirma que pasan.
2. Cambia una cosa.
3. Vuelve a correr. Si algo falla, el último cambio es el culpable.
4. Repite.

**Comentarios de revisión útiles:** dicen qué, por qué y una sugerencia. "Este `nth-child(4)` se
rompe si cambia el orden de productos; ¿podemos usar `paginaProductos.tarjeta('Taza térmica')`?"

## Lab (4 h + 2 h de práctica)

1. Antes de tocar código, lista en tu PR todos los code smells de `lab.spec.ts`.
2. Refactoriza usando el framework. Las pruebas deben seguir pasando.
3. Revisa el PR de un compañero con la tabla de arriba.

## Preguntas de repaso

1. ¿Por qué no se refactoriza una prueba que está fallando?
2. ¿Cómo evitas cobertura redundante al separar una prueba gigante?
