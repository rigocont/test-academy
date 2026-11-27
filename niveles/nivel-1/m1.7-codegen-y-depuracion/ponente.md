# Notas del ponente: M1.7 Codegen y depuración

## Antes de la clase

- Ten la tienda corriendo en una terminal y otra lista para `npx playwright codegen http://localhost:3000`.
- Graba el flujo completo una vez antes de clase y guarda el resultado para compararlo con la versión limpia.

## Guion de la sesión

1. **Demo de codegen (25 min).** Graba login, agregar 2 productos, carrito y finalizar compra. Muestra cómo agregar una aserción desde la barra del grabador.
2. **Limpiar el código (25 min).** Con la tabla de la guía, limpia el código grabado en vivo: quita clics innecesarios, cambia locators largos, agrega aserciones y divide en pruebas cortas. Cuenta las líneas antes y después.
3. **`--debug` y el Inspector (25 min).** `npx playwright test m1.2 --debug`: avanza paso a paso, revisa el locator resaltado y edítalo en el Inspector. Luego pon un `page.pause()` a la mitad de una prueba.
4. **Cuándo sí y cuándo no (15 min).** Sí: descubrir locators y explorar una pantalla nueva. No: entregar pruebas sin revisar.

## Errores comunes

- Entregar el código grabado sin aserciones.
- Dejar `page.pause()` en el código entregado: la suite se queda detenida en el CI.
- Grabar con datos que dependen del momento (un pedido recién creado) y que no existen en la siguiente corrida.

## Respuestas de referencia

1. No tiene aserciones, trae pasos innecesarios, locators frágiles y una sola prueba enorme.
2. `--debug` abre el Inspector desde el inicio de la prueba; `page.pause()` lo abre en el punto exacto del código donde lo pones.

## Cierre

En la siguiente sesión compara en vivo dos versiones limpias de distintos alumnos: es un buen ejercicio de revisión de código.
