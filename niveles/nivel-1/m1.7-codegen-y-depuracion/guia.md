# M1.7 Codegen y depuración básica (8 h)

## Objetivo

Usar el generador de código para explorar y el Inspector para depurar, sabiendo cuándo el código grabado no sirve tal cual.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 25 min | Demo de `codegen` con la tienda |
| 25 min | Limpiar el código grabado: qué quitar, qué cambiar |
| 25 min | `--debug` y el Inspector: avanzar paso a paso |
| 15 min | Cuándo sirve codegen y cuándo no |

## Conceptos clave

```bash
npm run app                                     # en una terminal
npx playwright codegen http://localhost:3000    # en otra
npx playwright test m1.2 --debug                # depurar paso a paso
```

Dentro de una prueba, `await page.pause();` detiene la ejecución y abre el Inspector.
Bórralo antes de entregar.

**Qué revisar en el código grabado:**

| Codegen genera | Cámbialo por |
|---|---|
| Clics que no hacen falta (por ejemplo, clic en un campo antes de `fill`) | Quítalos |
| Ninguna aserción | Agrega las validaciones del resultado esperado |
| Locators largos o con `nth()` | Locators por rol y nombre, con `filter` |
| Una prueba gigante | Varias pruebas cortas e independientes |
| Datos fijos repetidos | Variables o funciones |

Codegen sirve para **descubrir locators y explorar** una pantalla nueva. No sirve para
entregar pruebas sin revisarlas.

## Actividad guiada (4 h)

1. Graba con codegen el flujo completo: login, agregar 2 productos, ir al carrito, finalizar compra.
2. Guarda el código grabado tal cual en `grabado.spec.ts` de tu rama.
3. Crea `limpio.spec.ts` con el mismo flujo, aplicando la tabla de arriba.
4. Pon un `page.pause()` a la mitad, córrelo con `--headed` y recorre el resto con el Inspector.
5. En el PR explica 3 cambios que hiciste y por qué.

## Preguntas de repaso

1. ¿Por qué el código de codegen no se entrega tal cual?
2. ¿Qué diferencia hay entre `--debug` y `page.pause()`?

## Para el instructor

- Compara en vivo dos versiones limpias de distintos alumnos: es un buen ejercicio de revisión de código.
