# Nivel 0. Bases

Material de clase del [temario del Nivel 0](../../docs/temario/nivel-0-bases.md).

## Cómo se trabaja cada módulo

1. Lee la `guia.md` del módulo antes de la sesión en vivo.
2. En la sesión en vivo (1.5 h) el instructor explica y hace la demo.
3. En el lab abres `ejercicio.ts`, completas los `TODO` y corres las pruebas:

   ```bash
   npx playwright test m0.4
   ```

   Al principio casi todas fallan. Terminas cuando todas pasan.
4. Entregas tu trabajo como pull request (ver [M0.2](m0.2-git/guia.md)).

`solucion.ts` es la solución de referencia. Intenta no abrirla hasta terminar.

## Módulos

| # | Módulo | Guía | Ejercicio con pruebas |
|---|---|---|---|
| M0.1 | Entorno de trabajo | [guía](m0.1-entorno/guia.md) | Instalación verificada |
| M0.2 | Git para el día a día | [guía](m0.2-git/guia.md) | Primer pull request |
| M0.3 | Variables y tipos | [guía](m0.3-variables/guia.md) | `ejercicio.ts` |
| M0.4 | Decisiones y ciclos | [guía](m0.4-decisiones-y-ciclos/guia.md) | `ejercicio.ts` |
| M0.5 | Funciones | [guía](m0.5-funciones/guia.md) | `ejercicio.ts` |
| M0.6 | Arreglos y objetos | [guía](m0.6-arreglos-y-objetos/guia.md) | `ejercicio.ts` |
| M0.7 | Clases básicas | [guía](m0.7-clases/guia.md) | `ejercicio.ts` |
| M0.8 | Asincronía | [guía](m0.8-asincronia/guia.md) | `ejercicio.ts` |
| M0.9 | HTTP y APIs sin código | [guía](m0.9-http-y-apis/guia.md) | Documento de 5 endpoints |

## Proyecto final: validador de datos de prueba

Crea la carpeta `niveles/nivel-0/proyecto-final/` y dentro un archivo `validador.ts` que:

1. Lea `usuarios.json` (una lista de objetos con `nombre`, `correo` y `edad`).
   Tip: `JSON.parse(readFileSync('usuarios.json', 'utf-8'))`.
2. Valide cada usuario: nombre no vacío, correo válido (usa tu función de M0.5) y edad entre 18 y 99 (M0.4).
3. Imprima un reporte en consola con cuántos son válidos, cuántos no y por qué.
4. Tenga al menos 5 pruebas en `validador.spec.ts`.

Se entrega como pull request con al menos 3 commits. Se ejecuta con `npx tsx niveles/nivel-0/proyecto-final/validador.ts`
y sus pruebas con `npx playwright test validador`.
