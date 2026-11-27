# M3.11 Git avanzado (10 h)

## Objetivo

Manejar el historial con seguridad: ramas de release y hotfix, limpiar commits antes del merge,
llevar un arreglo a otra rama y deshacer un cambio que rompió `main` sin perder trabajo.

## Sesión en vivo (1.5 h, estrategias de ramas)

| Tiempo | Tema |
|---|---|
| 20 min | Trunk-based vs GitFlow: ramas `release/*` y `hotfix/*` |
| 20 min | Working tree, index (staging) y commits: `git add -p`, `git restore --staged` |
| 25 min | `rebase`, `rebase -i` (squash, reword, drop) y cuándo NO reescribir historial |
| 25 min | `cherry-pick`, `revert`, `reset` y `reflog` para rescatar trabajo |

## Conceptos clave

| Quiero... | Comando | ¿Reescribe historial? |
|---|---|---|
| Traer lo nuevo de main a mi rama | `git rebase main` (o `git merge main`) | rebase sí |
| Juntar mis commits "wip" en uno | `git rebase -i main` → `squash` | Sí |
| Llevar un hotfix a otra rama | `git cherry-pick <sha>` | No |
| Deshacer un commit que ya está en main | `git revert <sha>` | No (crea un commit nuevo) |
| Deshacer mi último commit local | `git reset --soft HEAD~1` | Sí |
| Recuperar algo que "perdí" | `git reflog` y `git switch -c rescate <sha>` | No |

- **Regla de oro:** no reescribas (rebase, reset, push --force) una rama que otra persona usa. En `main` y
  `release/*` solo `revert`.
- **Rollback de la suite:** si un commit rompió el CI, `git revert` y un PR. Investiga después (M3.10).
- **Squash merge** en GitHub hace el squash por ti al hacer merge del PR; no necesitas `rebase -i` si el equipo lo usa.
- **Tags** marcan releases: `git tag v1.1 && git push --tags`.

## Lab (3 h + 5 h de práctica)

Prepara el repositorio de práctica (no toca este repo):

```bash
node niveles/nivel-3/m3.11-git-avanzado/preparar-practica.mjs
cd <la ruta que imprime>
```

1. **Revert:** el último commit de `main` rompe la suite. Deshazlo sin reescribir historial.
2. **Cherry-pick:** lleva el hotfix de `release/1.0` a `main`.
3. **Squash:** en `feature/checkout` junta los 3 commits en uno llamado "Agrega pruebas de checkout"
   con `git rebase -i main`.
4. **Rebase:** deja `feature/checkout` encima del `main` actual y haz merge con `--ff-only`.
5. **Reflog:** haz `git reset --hard HEAD~2` en `main`, y recupera esos commits con `git reflog`.

Al terminar, `git log --oneline --graph --all` debe mostrar un `main` lineal con el revert, el hotfix y un
solo commit de checkout.

## Preguntas de repaso

1. ¿Por qué `revert` y no `reset` en `main`?
2. ¿Qué pasa si haces `rebase` de una rama que tu compañero ya descargó?
3. ¿Para qué sirve el index? Da un caso en el que `git add -p` te salvó.
