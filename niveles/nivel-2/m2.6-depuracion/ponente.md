# Notas del ponente: M2.6 Excepciones y depuración

## Antes de la clase

- Corre `npx playwright test m2.6` para tener los 5 traces de las pruebas rotas.
- Estudia las 5 fallas con `solucion.spec.ts` para saber la causa de cada una; no la reveles en clase.

## Guion de la sesión

1. **Leer un error (20 min).** Toma un error real y léelo de arriba abajo: qué acción, qué locator, cuánto esperó, el *call log* y la línea del código.
2. **Trace Viewer (30 min).** Abre un trace: acciones, snapshot antes y después, red y consola. Muestra cómo encontrar el momento exacto en que la página no estaba como la prueba esperaba.
3. **Errores propios (20 min).** `throw new Error('La tabla no tiene la columna "Estado"')` vs un `undefined` sin contexto. Mensaje en la aserción: `expect(status, cuerpo).toBe(201)` muestra el cuerpo del error cuando falla.
4. **Clasificar fallas (20 min).** Con la tabla de la guía, clasifiquen juntos la primera prueba rota del lab. Las otras 4 son del lab.

## Errores comunes

- Corregir sin entender: cambiar el locator hasta que pase.
- Atrapar errores con `try/catch` y seguir: la prueba pasa escondiendo el problema.
- Clasificar todo como "flaky".

## Respuestas de referencia

1. El estado de la página antes y después de cada acción, las peticiones de red, la consola y el tiempo de cada paso.
2. Porque un diálogo sin manejar bloquearía la página; Playwright lo cierra (cancela) para no colgar la prueba.
3. Revisando la respuesta de la API en el trace: si la API responde mal, es backend; si responde bien y la pantalla muestra otra cosa, es frontend; si falla solo en un ambiente o con errores de red, es ambiente.

## Cierre

En el PR, por cada prueba: qué dice el error, qué mostró el trace, la causa y la clasificación. Después la corrección.
