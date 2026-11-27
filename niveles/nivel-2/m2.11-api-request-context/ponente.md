# Notas del ponente: M2.11 APIRequestContext

## Antes de la clase

- Abre `m2.11-api-request-context/lab.spec.ts` y revisa el `beforeAll` que los alumnos deben completar.
- Prepara una prueba que crea un contexto y no lo libera, para mostrar la advertencia.

## Guion de la sesión

1. **`request` vs `newContext()` (20 min).** El fixture `request` vive lo que dura una prueba. `newContext()` crea un cliente que puedes configurar y compartir en un archivo, pero tú lo cierras.
2. **Configuración (25 min).** `baseURL` y `extraHTTPHeaders` con el token: ya no repites el header en cada llamada. `dispose()` en `afterAll`.
3. **Demo con pedidos (25 min).** Crea un pedido, consúltalo por id, búscalo con filtro por cliente, cámbialo a pagado.
4. **Aserciones (20 min).** `toMatchObject` vs `toEqual` con un pedido: `toEqual` falla por el `id` y las `notas`; `toMatchObject` valida solo lo que importa. Valida también un header de la respuesta.

## Errores comunes

- Olvidar `dispose()` y dejar conexiones abiertas.
- Crear el contexto en `beforeAll` y sus datos también: las pruebas terminan compartiendo un pedido.
- Usar `toEqual` con objetos que traen ids o fechas generadas.

## Respuestas de referencia

1. Para liberar las conexiones y la memoria del contexto; sin eso la corrida puede quedar colgada o consumir recursos.
2. Cuando la respuesta tiene campos que no controlas (id, fechas) o que no son relevantes para el caso.

## Cierre

Recuérdales la regla del nivel: el contexto puede ser compartido; los datos, no.
