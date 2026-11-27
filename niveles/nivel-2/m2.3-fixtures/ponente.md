# Notas del ponente: M2.3 Fixtures

## Antes de la clase

- Abre `framework/fixtures.ts` y el `lab.spec.ts` de M2.2 y M2.3 lado a lado para comparar.
- Ten listo un `console.log` dentro de un fixture para mostrar cuándo se ejecuta.

## Guion de la sesión

1. **Qué es un fixture (20 min).** `page` y `request` ya son fixtures: Playwright los crea solo si la prueba los pide y los limpia al terminar. Muestra una prueba que no pide `page` y no abre navegador.
2. **`test.extend` (30 min).** Crea `paginaLogin` en vivo: preparar, `use()`, limpiar. Agrega `console.log` antes y después de `use()` para ver el orden en la terminal.
3. **Composición y opciones (20 min).** `paginaProductos` depende de `paginaLogin`. Luego la opción `usuario` con `test.use({ usuario: 'admin' })` en un `describe`.
4. **Fixtures vs `beforeEach` (20 min).** `beforeEach` corre siempre, aunque la prueba no lo necesite; el fixture solo cuando se pide y se puede reutilizar entre archivos.

## Errores comunes

- Olvidar `await use(...)`: la prueba nunca recibe el valor y se queda esperando.
- Importar `test` desde `@playwright/test` en lugar de `framework/fixtures` y no tener los fixtures propios.
- Hacer en el fixture trabajo que solo algunas pruebas necesitan (crear datos pesados para todos).

## Respuestas de referencia

1. El fixture se crea solo cuando la prueba lo pide, se reutiliza entre archivos y trae su limpieza; `beforeEach` corre para todas las pruebas del bloque.
2. Corre al terminar la prueba, aunque haya fallado: es el lugar para limpiar.
3. Con `test.use({ usuario: 'otro' })` en el archivo o en un `describe`.

## Cierre

Reto: comparar las líneas de los labs de M2.2 y M2.3 para las mismas pruebas.
