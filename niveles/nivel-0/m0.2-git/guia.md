# M0.2 Git para el día a día (10 h)

## Objetivo

Usar Git de forma segura para guardar tu trabajo y entregarlo como pull request.
Corresponde a **Git Beginner** del framework.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 15 min | Por qué un QA usa Git: las pruebas son código y se revisan como código |
| 20 min | Repositorio local vs remoto, qué es un commit |
| 40 min | Demo del flujo completo: fork, clone, rama, commit, push, pull request |
| 15 min | Dudas y errores comunes |

## Conceptos clave

```text
Tu computadora                              GitHub
┌──────────────────────────────┐           ┌──────────────┐
│ carpeta → staging → commits  │  push →   │   remoto     │
│  (edit)   (add)    (commit)  │  ← pull   │  (origin)    │
└──────────────────────────────┘           └──────────────┘
```

| Comando | Qué hace |
|---|---|
| `git clone <url>` | Copia un repositorio remoto a tu computadora |
| `git status` | Muestra qué archivos cambiaste y cuáles están listos para commit |
| `git add <archivo>` | Prepara un cambio para el siguiente commit |
| `git commit -m "mensaje"` | Guarda los cambios preparados con un mensaje |
| `git push` | Sube tus commits al remoto |
| `git pull` | Trae los cambios del remoto |
| `git switch -c <rama>` | Crea una rama nueva y se cambia a ella |

**Buenos mensajes de commit:** dicen qué cambió, en presente. "Completar ejercicio M0.4" sí;
"cambios" o "asdf" no.

## Lab (4 h + 4 h de práctica durante el nivel)

1. Haz **fork** del repo de la academia en GitHub y clona tu fork.
2. Crea una rama para el módulo: `git switch -c m0.3-variables`.
3. Completa un ejercicio pequeño (por ejemplo los dos primeros `TODO` de M0.3).
4. Revisa con `git status`, prepara con `git add` y haz commit.
5. Sube la rama con `git push -u origin m0.3-variables`.
6. Abre un **pull request** en GitHub hacia la rama `main` de tu fork y pide revisión al instructor.
7. A partir de aquí, cada módulo se entrega igual: una rama y un pull request.

**Listo cuando:** tienes un pull request abierto con al menos 2 commits y buenos mensajes.

## Preguntas de repaso (son las preguntas A de Git del examen de ubicación)

1. ¿Qué es una rama y para qué sirve?
2. ¿Para qué sirve `git clone`?
3. ¿Qué muestra `git status`?

## Para el instructor

- Antes de la sesión, verifica que todos tienen cuenta de GitHub.
- Error común: hacer commit de `node_modules`. El `.gitignore` del repo ya lo evita; muéstralo.
