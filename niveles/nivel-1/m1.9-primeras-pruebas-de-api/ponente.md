# Notas del ponente: M1.9 Primeras pruebas de API

## Antes de la clase

- Ten el `endpoints.md` de algún alumno de M0.9 para automatizar uno de sus casos en vivo.
- Prepara dos pruebas que validan "productos de hogar": una por UI y otra por API, para comparar tiempos.

## Guion de la sesión

1. **Por qué por API (15 min).** Corre las dos versiones de "productos de hogar" y compara el tiempo en el reporte. La API no depende de la pantalla, así que es más rápida y estable.
2. **El fixture `request` (30 min).** `get` con `params`, `post` con `data`, `delete`. Muestra que usa la `baseURL` igual que `page`.
3. **Validar status, body y errores (25 min).** `status()`, `toBeOK()`, `json()`, `toMatchObject` y `expect.any(Number)`. Crea un usuario sin correo y valida el 400 y el mensaje de error.
4. **Datos de prueba (20 min).** Las pruebas que crean y borran modifican el servidor. Por eso este archivo llama a `/api/reiniciar` y corre en serie. Adelanta que en el Nivel 2 aprenderán a aislar datos para correr en paralelo.

## Errores comunes

- Validar solo el status y no el cuerpo.
- Olvidar `await` en `respuesta.json()`.
- Quitar el modo serial y ver fallas al azar porque las pruebas se reinician los datos entre sí.

## Respuestas de referencia

1. El número que resume el resultado: 200, 201, 204, 400, 401, 403, 404, 500.
2. Revisando campos y tipos del cuerpo, mensajes de error, que lo creado se pueda consultar y que lo borrado ya no exista.
3. Porque todas comparten los mismos usuarios y llaman a `/api/reiniciar`; en paralelo una prueba borraría los datos de otra.

## Cierre

Segunda parte del lab: automatizar los 5 endpoints que documentaron en M0.9.
