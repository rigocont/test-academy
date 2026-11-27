# Notas del ponente: M2.10 REST a fondo

## Antes de la clase

- Lee el encabezado de `app/pedidos.mjs`: ahí está documentada toda la API de pedidos.
- Prepara peticiones en `curl` o en una herramienta como Bruno o Postman: login, GET con y sin token, PATCH con transición inválida.

## Guion de la sesión

1. **Autenticación con token (25 min).** Haz login por API y muestra el token. GET `/api/pedidos` sin token (401), con token (200), y login con el usuario `bloqueado` (403). Pide que expliquen la diferencia entre 401 y 403 con sus palabras.
2. **Seguros e idempotentes (25 min).** Llena la tabla con ellos. Demuestra: `PUT /notas` dos veces deja lo mismo; `POST` dos veces crea dos pedidos; `DELETE` dos veces da 204 y luego 404.
3. **Headers (20 min).** `Content-Type`, `Authorization`, `Accept`. Manda un body sin `Content-Type` y observa la respuesta.
4. **Paginación y filtros (20 min).** `?estado=pagado&pagina=2&porPagina=5`. Valida que `total` no cambia entre páginas y que `datos` tiene máximo `porPagina` elementos.

## Errores comunes

- Confundir 401 y 403.
- Escribir `Bearer` sin espacio o con otro formato.
- Usar los pedidos semilla y cambiarles el estado (afecta a otras pruebas en paralelo).

## Respuestas de referencia

1. Que repetir la misma petición deja el servidor en el mismo estado que hacerla una vez.
2. Son metadatos de la petición y la respuesta: tipo de contenido, autenticación, formato aceptado, caché. Sin ellos el servidor puede rechazar o malinterpretar la petición.
3. 401: no sabemos quién eres (falta el token o no es válido). 403: sabemos quién eres y no tienes permiso.

## Cierre

Son 6 pruebas. Para practicar con otra API autenticada: `restful-booker.herokuapp.com`.
