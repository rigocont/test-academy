# Notas del ponente: M0.7 Clases básicas

## Antes de la clase

- Abre el ejercicio de M0.7 (`Carrito` y `Usuario`) y su archivo de pruebas, con `beforeEach` visible.
- Ten la página de login de la tienda abierta para la vista previa del Page Object.

## Guion de la sesión

1. **Clase vs objeto (20 min).** La clase es el molde, el objeto es la galleta. Crea dos `Contador` con `new` y muestra que cada uno lleva su propia cuenta.
2. **Propiedades, métodos, constructor y `this` (30 min).** Escribe `Contador` en vivo. Borra un `this.` a propósito y lee el error de TypeScript con el grupo.
3. **`private` y `public` (15 min).** Intenta modificar `valor` desde fuera y muestra el error. Explica que `private` protege el estado para que solo cambie por los métodos.
4. **Vista previa de Page Object (25 min).** Muestra `PaginaLogin` de la guía junto a la página real. Que identifiquen qué parte de la clase corresponde a cada campo de la pantalla.

## Errores comunes

- Olvidar `this.` dentro de los métodos.
- Olvidar `new` al crear la instancia.
- Hacer todo `public` "para que funcione".

## Respuestas de referencia

1. La clase define la estructura y el comportamiento; el objeto es una instancia concreta con sus propios datos.
2. Para que nadie modifique la lista desde fuera sin pasar por `agregar` o `quitar`, que validan los datos.
3. Si la página cambia, se corrige en un solo lugar y las pruebas se leen como acciones del usuario.

## Cierre

Señala el `beforeEach` del archivo de pruebas: crea un objeto nuevo para cada prueba. Lo usarán mucho en el Nivel 1.
