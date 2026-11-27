# Notas del ponente: M0.2 Git para el día a día

## Antes de la clase

- Verifica que todos tienen cuenta de GitHub y que configuraron `git config --global user.name` y `user.email`.
- Prepara un repo de demostración vacío en tu cuenta para hacer el flujo completo en vivo.
- Ten abierta la vista de pull requests de GitHub para mostrar cómo se revisa.

## Guion de la sesión

1. **Por qué Git (15 min).** Cuenta un caso real: una prueba que alguien borró sin querer y se recuperó del historial. Las pruebas son código y se revisan como código.
2. **Local vs remoto (20 min).** Dibuja el diagrama de la guía en el pizarrón: carpeta, staging, commits, remoto. Insiste en que `add` no guarda nada todavía: solo prepara.
3. **Demo del flujo completo (40 min).** En vivo: fork, clone, `git switch -c`, editar, `git status`, `git add`, `git commit`, `git push -u origin`, abrir el PR. Después de cada comando corre `git status` y pide que lean la salida en voz alta.
4. **Dudas y errores (15 min).** Provoca a propósito un `git push` sin `-u` en una rama nueva y lee el mensaje de error con ellos: Git dice qué comando correr.

## Errores comunes

- Hacer commit de `node_modules`: muestra que el `.gitignore` del repo ya lo evita.
- Trabajar directo en `main` en lugar de una rama.
- Mensajes como "cambios": pide mensajes que digan qué cambió ("Completar ejercicio M0.3").
- Abrir el PR contra el repo original en lugar de su fork.

## Respuestas de referencia

1. Una rama es una línea de trabajo independiente; permite cambiar cosas sin afectar `main` hasta que se revisa.
2. Copia un repositorio remoto con todo su historial a tu computadora.
3. Qué archivos cambiaron, cuáles están preparados para el commit y en qué rama estás.

## Cierre

Desde hoy cada módulo se entrega como rama y pull request. Revisa que todos tengan su primer PR abierto antes de la siguiente sesión.
