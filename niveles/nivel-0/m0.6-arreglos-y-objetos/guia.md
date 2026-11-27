# M0.6 Arreglos y objetos (10 h)

## Objetivo

Manejar datos de prueba como arreglos de objetos y transformarlos con `map`, `filter` y `find`.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Objetos, `interface` y `type` |
| 20 min | Arreglos: crear, leer, `push`, `length` |
| 35 min | `map`, `filter`, `find`, `sort` con datos de la tienda |
| 15 min | JSON: el formato en que llegan los datos de una API |

## Conceptos clave

```ts
interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

const productos: Producto[] = [
  { id: 1, nombre: 'Mochila', precio: 899 },
  { id: 2, nombre: 'Taza', precio: 249 },
];

productos.map((p) => p.nombre);          // ['Mochila', 'Taza']           transforma cada uno
productos.filter((p) => p.precio < 500); // [{ id: 2, ... }]               se queda con algunos
productos.find((p) => p.id === 2);       // { id: 2, ... } o undefined     busca el primero

// JSON es texto con la misma forma que un objeto
const texto = '{"id": 1, "nombre": "Mochila"}';
const objeto = JSON.parse(texto);        // texto → objeto
const deNuevo = JSON.stringify(objeto);  // objeto → texto
```

## Lab (4 h)

Completa `ejercicio.ts` y corre `npx playwright test m0.6`.

**Reto extra:** con la tienda corriendo (`npm run app`), abre `http://localhost:3000/api/productos`
en el navegador. Es el mismo arreglo del ejercicio, pero en JSON.

## Preguntas de repaso

1. ¿Qué devuelve `find` si no encuentra nada? ¿Por qué importa en una prueba?
2. ¿Qué diferencia hay entre `map` y `filter`?
3. ¿Para qué sirve una `interface`?

## Para el instructor

- Insiste en `interface`: en el Nivel 1 van a tipar las respuestas de la API con lo mismo.
