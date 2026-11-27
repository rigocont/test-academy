# M2.9 Git en equipo (6 h)

## Objetivo

Trabajar en una rama compartida, integrar cambios de otros y resolver conflictos simples.
Corresponde a **Git Intermediate** del framework.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Ramas, `switch`, `merge` y cómo se ve el historial |
| 20 min | Por qué aparece un conflicto |
| 35 min | Demo: provocar y resolver un conflicto en un Page Object |
| 15 min | `git push` rechazado porque tu rama está atrás |

## Conceptos clave

```bash
git switch -c m2-paginas            # crear rama y cambiarse
git switch main                     # cambiar de rama
git pull                            # traer cambios del remoto
git merge main                      # integrar main en tu rama
git log --oneline --graph           # ver el historial
```

Un conflicto se ve así. Decides qué queda, borras las marcas y haces commit:

```text
<<<<<<< HEAD
    return this.page.getByRole('alert');
=======
    return this.page.locator('#error');
>>>>>>> main
```

Si `git push` responde *rejected* porque tu rama está atrás: `git pull`, resuelve si hay
conflicto, vuelve a correr las pruebas y haz `push` otra vez. Nunca `push --force` en una rama compartida.

## Actividad guiada (4 h)

En parejas, sobre el mismo fork:

1. Ambos crean una rama desde `main`.
2. Cada uno cambia `PaginaLogin.mensajeError` de forma distinta y hace commit.
3. El primero abre PR y hace merge.
4. El segundo hace `git merge main` en su rama, resuelve el conflicto, corre `npx playwright test m2.2` y hace push.

## Proyecto 2A

Un framework con Page Objects y fixtures para la tienda, con al menos **20 pruebas de UI**
(login, catálogo, carrito, checkout, pedidos y herramientas), sin duplicación, sin
`waitForTimeout`, que pase con `--repeat-each=3` y revisado por un compañero en un PR.

## Preguntas de repaso (preguntas B de Git del examen)

1. ¿Qué diferencia hay entre merge y rebase? (Rebase se ve a fondo en el Nivel 3.)
2. ¿Qué pasa si haces `git push` y tu rama está atrás del remoto?
3. ¿Qué es `git push --force` y por qué es peligroso en una rama compartida?
