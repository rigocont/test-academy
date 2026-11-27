# M2.7 Colecciones y datos (8 h)

## Objetivo

Manejar datos de prueba desde archivos y organizarlos con `Map` y `Set`.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Datos de prueba: en el código, en archivos o generados |
| 25 min | Leer JSON y CSV con `fs` |
| 25 min | `Map` y `Set`: cuándo son mejores que un arreglo o un objeto |
| 20 min | Datos únicos para pruebas en paralelo: `framework/datos/generadores.ts` |

## Conceptos clave

```ts
import { readFileSync } from 'node:fs';
const usuarios = JSON.parse(readFileSync('datos/usuarios.json', 'utf-8'));

const porCategoria = new Map<string, Producto[]>();   // llave → valor, conserva el orden
porCategoria.set('hogar', [taza]);
porCategoria.get('hogar');

const vistos = new Set<number>();                     // valores sin repetir
vistos.add(3); vistos.has(3);                         // true
[...new Set([1, 1, 2])];                              // [1, 2]
```

| Necesitas | Usa |
|---|---|
| Lista ordenada | Arreglo |
| Buscar por llave muchas veces | `Map` |
| Saber si algo ya apareció | `Set` |
| Un registro con campos fijos | Objeto con `interface` |

**Datos generados:** `clienteUnico()` arma un nombre que no se repite entre pruebas ni entre
ejecuciones. Para más variedad de datos se puede usar una librería como `@faker-js/faker`.

## Lab (4 h + 2 h de práctica)

Completa `ejercicio.ts` y corre `npx playwright test m2.7`. Tu `leerCsv` se reutiliza en M2.13.

## Preguntas de repaso

1. ¿Cuándo conviene tener los datos de prueba en un archivo y no en el código?
2. ¿Qué ventaja tiene `Map` sobre un objeto para agrupar?
