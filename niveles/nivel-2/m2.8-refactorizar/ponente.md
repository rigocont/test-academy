# Notas del ponente: M2.8 Leer y refactorizar código ajeno

## Antes de la clase

- Abre `m2.8-refactorizar/lab.spec.ts`: es el código con code smells.
- Elige un PR real (de un alumno, con permiso) para la revisión en vivo.

## Guion de la sesión

1. **Code smells (25 min).** Proyecta `lab.spec.ts` y pide que griten cada smell que vean. Escríbelos en la tabla de la guía. Que lleguen por lo menos a 6.
2. **Refactorizar con seguridad (25 min).** Corre las pruebas, cambia una cosa (un login copiado por el fixture), vuelve a correr. Repite con otro cambio. Insiste: nunca dos cambios entre corridas.
3. **Revisión de un PR en vivo (30 min).** Revisa el PR elegido con la tabla de smells. Escribe los comentarios en GitHub frente al grupo.
4. **Comentarios útiles (10 min).** Qué, por qué y una sugerencia. Compara "esto está mal" con el ejemplo de la guía.

## Errores comunes

- Refactorizar todo de golpe y no saber qué cambio rompió la prueba.
- Cambiar el comportamiento (qué valida la prueba) mientras se refactoriza.
- Comentarios de revisión que imponen gustos personales sin explicar el riesgo.

## Respuestas de referencia

1. Porque no sabrías si la falla viene de tu cambio o ya estaba; primero se arregla, luego se mejora.
2. Haciendo que cada prueba nueva valide un solo comportamiento y revisando que dos pruebas no fallen siempre por la misma causa.

## Cierre

Primero listan los smells en el PR, luego refactorizan, y al final revisan el PR de un compañero.
