# Notas del ponente: M1.10 Git en el flujo de pruebas

## Antes de la clase

- Elige dos PRs reales de alumnos (uno bueno y uno mejorable) y pide permiso para revisarlos en vivo.
- Ten el `.gitignore` del repo abierto.

## Guion de la sesión

1. **Qué no se sube (20 min).** Corre la suite y muestra las carpetas que aparecen: `test-results/` y `playwright-report/`. Explica por qué no van al repo: se generan en cada corrida, pesan y causan conflictos.
2. **Commits pequeños (25 min).** Muestra un historial con "cambios" y otro que cuenta la historia ("Agregar pruebas de login", "Corregir locator del carrito"). Pregunta cuál quisieran revisar.
3. **Un buen PR de pruebas (30 min).** Revisa en vivo los dos PRs con la lista de la guía. Deja comentarios que enseñan: "¿qué pasa si corre en paralelo?" en lugar de "está mal".
4. **Rama al día (15 min).** `git pull` de `main` en su rama y qué hacer si hay un conflicto simple.

## Errores comunes

- Subir `test-results/` porque se agregó con `git add .` antes de tener `.gitignore`.
- PRs con 3 labs mezclados.
- Comentarios de revisión que solo dicen "ok" o "mal".

## Respuestas de referencia

1. Una línea de trabajo separada; permite cambiar cosas sin afectar `main` hasta que se revisa en un PR.
2. Se generan en cada corrida, pesan mucho, no aportan al código y provocan conflictos entre ramas.

## Cierre

Para el proyecto final, cada quien revisa el PR de un compañero y deja al menos 3 comentarios.
