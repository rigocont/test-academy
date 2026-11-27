# Notas del ponente: M1.4 Aserciones

## Antes de la clase

- Prepara la prueba "que pasa sin probar nada": un `expect(locator)` sin `await` o una aserción sobre algo que siempre es verdadero.
- Ten la página del carrito con 2 productos para mostrar `toHaveText` del total.

## Guion de la sesión

1. **Una buena aserción (20 min).** Valida el resultado que le importa al usuario, es específica y falla con un mensaje claro. "El total dice $597 MXN" es mejor que "hay un elemento total".
2. **Web-first vs genéricas (30 min).** Las web-first reintentan hasta 5 s y llevan `await`; las genéricas evalúan una sola vez un valor que ya tienes. Muestra el contador del carrito con `textContent()` (falla a veces) y con `toHaveText` (siempre pasa).
3. **Soft assertions y mensajes (20 min).** Revisa 4 datos del checkout con `expect.soft` y rompe 2: el reporte muestra las dos fallas juntas. Agrega un mensaje personalizado y míralo en el reporte.
4. **La prueba que pasa sin probar nada (20 min).** Córrela, pasa. Cambia el valor esperado por uno absurdo: sigue pasando. Pregunta por qué. Es la técnica clave del módulo: haz fallar tu prueba una vez a propósito.

## Errores comunes

- `expect(await locator.textContent()).toBe(...)` en lugar de `await expect(locator).toHaveText(...)`.
- Olvidar `await` en una web-first assertion: la prueba termina antes de validar.
- Usar `expect.soft` en todo: las fallas en cadena llenan el reporte de ruido.

## Respuestas de referencia

1. `toHaveText` reintenta hasta que el texto coincide; `textContent()` lee una sola vez, aunque la página no se haya actualizado.
2. Para revisar varios datos independientes de una misma pantalla y ver todas las diferencias en una corrida.
3. Cambiando a propósito el valor esperado: si la prueba sigue pasando, no está validando.

## Cierre

La última prueba del lab siempre pasa: el reto es explicar por qué en el PR.
