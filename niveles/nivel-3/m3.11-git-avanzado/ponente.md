# Notas del ponente: M3.11 Git avanzado

## Antes de la clase

- Corre `node niveles/nivel-3/m3.11-git-avanzado/preparar-practica.mjs` y resuelve los 5 ejercicios una vez para conocer los resultados.
- Ten una segunda copia limpia del repo de práctica para hacer la demo.

## Guion de la sesión

1. **Estrategias de ramas (20 min).** Trunk-based (ramas cortas y merge frecuente) vs GitFlow (`release/*`, `hotfix/*`). Pregunta cuál usa cada equipo y qué les duele.
2. **Working tree, index y commits (20 min).** `git add -p` para preparar parte de un archivo; `git restore --staged` para sacarlo del index. Muestra `git status` en cada paso.
3. **Rebase e interactive rebase (25 min).** En el repo de práctica: `git rebase -i main` en `feature/checkout`, juntar los 3 commits "wip" en uno. Explica la regla de oro: no reescribir ramas que otros usan.
4. **Cherry-pick, revert, reset y reflog (25 min).** Revert del commit que rompe la suite en `main`, cherry-pick del hotfix, y un `reset --hard` "accidental" recuperado con `reflog`.

## Errores comunes

- `rebase` de una rama que un compañero ya descargó.
- `reset --hard` en `main` para deshacer un commit publicado.
- Pánico ante "perdí mis commits" sin conocer `reflog`.

## Respuestas de referencia

1. Porque `revert` no reescribe la historia publicada: crea un commit nuevo que deshace el anterior y nadie pierde trabajo.
2. Su historial y el tuyo quedan distintos; al hacer pull se duplican commits o aparecen conflictos difíciles de resolver.
3. Es la zona donde preparas el siguiente commit; permite hacer commits pequeños y separar cambios de un mismo archivo con `git add -p`.

## Cierre

Al terminar, `git log --oneline --graph --all` debe mostrar un `main` lineal con el revert, el hotfix y un solo commit de checkout.
