# M0.9 HTTP y APIs sin código (12 h)

## Objetivo

Entender cómo funciona una API REST y validarla a mano antes de automatizarla en el Nivel 1.
Corresponde a **REST API Basic** del framework.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Qué es una API y qué pasa cuando el navegador pide una página |
| 25 min | Request y response: método, URL, headers, query params, body, código de estado |
| 30 min | Demo: explorar la API de la tienda con el navegador, DevTools y `curl` |
| 15 min | Cómo documentar un endpoint |

## Conceptos clave

| Método | Para qué | Ejemplo en la tienda |
|---|---|---|
| `GET` | Leer | `GET /api/productos` |
| `POST` | Crear | `POST /api/usuarios` |
| `PUT` / `PATCH` | Actualizar | (no existe en la tienda) |
| `DELETE` | Borrar | `DELETE /api/usuarios/3` |

| Código | Significa |
|---|---|
| 200 OK | Todo bien |
| 201 Created | Se creó el recurso |
| 204 No Content | Bien, pero sin cuerpo (por ejemplo al borrar) |
| 400 Bad Request | Los datos que mandaste están mal |
| 401 / 403 | Sin autenticación / sin permiso |
| 404 Not Found | No existe |
| 500 Internal Server Error | Falló el servidor |

**Partes de una petición:**

```text
POST /api/usuarios?origen=academia      ← método, ruta y query param
Content-Type: application/json          ← header
                                        
{ "nombre": "Ana", "correo": "ana@ejemplo.com" }   ← body
```

## API de la tienda de práctica

Con `npm run app` corriendo:

| Endpoint | Qué hace |
|---|---|
| `GET /api/productos` | Lista de productos. Acepta `?categoria=hogar`. Tarda 600 ms a propósito. |
| `GET /api/productos/:id` | Un producto, o 404 si no existe |
| `GET /api/usuarios` | Lista de usuarios |
| `GET /api/usuarios/:id` | Un usuario, o 404 |
| `POST /api/usuarios` | Crea un usuario. Requiere `nombre` y `correo` válido. Devuelve 201, o 400 con `{ "error": ... }` |
| `DELETE /api/usuarios/:id` | Borra un usuario. Devuelve 204, o 404 |
| `POST /api/reiniciar` | Regresa los usuarios a los datos iniciales |

Probar desde la terminal:

```bash
curl -i http://localhost:3000/api/productos/3
curl -i -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Rosa","correo":"rosa@ejemplo.com"}'
```

## Lab (4 h + 6 h de práctica)

Crea `endpoints.md` en tu rama y documenta 5 casos, cada uno con: método y URL, headers,
body enviado, código de estado esperado y obtenido, y el cuerpo de la respuesta.
Incluye al menos un caso de error (400 y 404). En el lab M1.9 los vas a automatizar.

## Preguntas de repaso (preguntas A de REST API del examen)

1. ¿Cuáles son los métodos HTTP más comunes?
2. ¿Qué hace un `GET`?
3. ¿Qué es un código de estado? Menciona algunos.

## Para el instructor

- En DevTools (pestaña Network) muestra la llamada a `/api/productos` al cargar la página de productos: conecta UI y API.
