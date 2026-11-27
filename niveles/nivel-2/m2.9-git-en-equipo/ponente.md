# Notas del ponente: M2.9 Git en equipo

## Antes de la clase

- Prepara un repo de demostración con dos ramas que cambian la misma línea de `PaginaLogin.mensajeError`.
- Arma las parejas para la actividad antes de la sesión.

## Guion de la sesión

1. **Ramas, `switch` y `merge` (20 min).** Crea dos ramas, haz un commit en cada una e intégralas. Muestra el resultado con `git log --oneline --graph`.
2. **Por qué aparece un conflicto (20 min).** Git no puede elegir cuando dos ramas cambian las mismas líneas. Si cambian archivos o líneas distintas, integra solo.
3. **Demo del conflicto (35 min).** Provoca el conflicto en `PaginaLogin`. Abre el archivo en VS Code y recorre las marcas `<<<<<<<`, `=======` y `>>>>>>>`. Decide en voz alta qué queda, borra las marcas, corre las pruebas y haz commit. Insiste en correr las pruebas antes del commit.
4. **Push rechazado (15 min).** Haz que tu rama quede atrás y que el push falle. Resuelve con `git pull`, pruebas y push. Explica por qué nunca `push --force` en una rama compartida.

## Errores comunes

- Dejar marcas de conflicto en el archivo y hacer commit.
- Resolver el conflicto quedándose siempre con "lo mío" sin leer el otro cambio.
- No volver a correr las pruebas después de resolver.

## Respuestas de referencia

1. Merge une dos historias con un commit de integración; rebase reescribe tus commits encima de la otra rama y deja un historial lineal.
2. El remoto lo rechaza; hay que traer los cambios (`git pull`), resolver conflictos, probar y volver a subir.
3. Reemplaza el historial remoto por el tuyo; en una rama compartida borra el trabajo que otros ya subieron.

## Cierre

Presenta el Proyecto 2A: 20 pruebas de UI con Page Objects y fixtures, sin `waitForTimeout`, que pase con `--repeat-each=3` y revisado por un compañero.
