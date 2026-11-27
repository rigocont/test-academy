# Notas del ponente: M0.3 Variables y tipos

## Antes de la clase

- Abre `niveles/nivel-0/m0.3-variables/ejercicio.ts` en VS Code con la terminal lista.
- Corre `npx playwright test m0.3` una vez para ver las 6 fallas que verán los alumnos.

## Guion de la sesión

1. **`let` vs `const` (20 min).** Regla simple: `const` por defecto, `let` solo si el valor cambia. Muestra que reasignar un `const` da error en el editor antes de correr.
2. **Tipos básicos (30 min).** Escribe `const total: number = '100'` y deja que vean el subrayado rojo. Ese es el valor de TypeScript: el error aparece al escribir, no a las 3 a. m. en el CI.
3. **Template strings (20 min).** Arma una URL con `${puerto}` y un mensaje "Prueba 3 de 10". Haz el error a propósito con comillas simples para que vean que no se reemplaza.
4. **Demo del primer TODO (20 min).** Corre la prueba, lee *Expected* y *Received* en voz alta, resuelve el primer TODO y vuelve a correr hasta verlo en verde.

## Errores comunes

- Comillas normales en lugar de invertidas: `${}` aparece literal en el texto.
- Confundir `=` (asignar) con `===` (comparar), que verán en M0.4.
- Borrar el tipo para "quitar el error" en lugar de corregir el valor.

## Respuestas de referencia

1. Cuando el valor cambia durante la ejecución: un contador de intentos, un total que se acumula.
2. El error aparece al escribir el código y no después de correr una suite de 20 minutos.
3. `` `Prueba ${actual} de ${total}` ``.

## Cierre

Recuerda entregar por pull request (lo vieron en M0.2). El reto extra con `string[]` adelanta los arreglos de M0.6.
