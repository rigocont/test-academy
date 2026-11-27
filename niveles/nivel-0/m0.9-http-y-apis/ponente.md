# Notas del ponente: M0.9 HTTP y APIs sin código

## Antes de la clase

- Levanta la tienda (`npm run app`) y ten DevTools abierto en la pestaña Network.
- Prueba los comandos `curl` de la guía. En Windows usa `curl.exe` en PowerShell o la terminal de Git Bash.
- Corre `curl -X POST http://localhost:3000/api/reiniciar` al final de la demo para dejar los datos limpios.

## Guion de la sesión

1. **Qué es una API (20 min).** Recarga la página de productos con Network abierto y señala la llamada a `/api/productos`. La pantalla es solo una forma de mostrar lo que devuelve la API.
2. **Request y response (25 min).** En la pestaña Network, recorre método, URL, headers, query params, body y status de una petición real.
3. **Demo con navegador, DevTools y `curl` (30 min).** `GET /api/productos/3` (200), `/api/productos/99` (404), `POST /api/usuarios` válido (201) y sin correo (400). Pide que predigan el código antes de cada uno.
4. **Documentar un endpoint (15 min).** Llenen juntos el primer caso de `endpoints.md`: método y URL, headers, body, status esperado y obtenido, respuesta.

## Errores comunes

- Olvidar `Content-Type: application/json` en el POST y recibir 400.
- Comillas simples dentro del JSON en Windows: usar comillas dobles escapadas o Git Bash.
- Confundir 401 (no sabemos quién eres) con 403 (sabemos quién eres y no tienes permiso).

## Respuestas de referencia

1. GET, POST, PUT, PATCH y DELETE.
2. Lee un recurso sin modificarlo.
3. Un número que resume el resultado: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Internal Server Error.

## Cierre

Los 5 casos de `endpoints.md` se automatizan en M1.9. Pide que incluyan por lo menos un 400 y un 404.
