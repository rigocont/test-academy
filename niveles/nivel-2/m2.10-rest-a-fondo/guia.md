# M2.10 REST a fondo (12 h)

## Objetivo

Probar autenticación, métodos seguros e idempotentes y headers, no solo el código de estado.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 25 min | Autenticación con token: login, header `Authorization`, 401 vs 403 |
| 25 min | Métodos seguros e idempotentes |
| 20 min | Headers que importan: `Content-Type`, `Authorization`, `Accept` |
| 20 min | Paginación y filtros |

## Conceptos clave

| Método | Seguro (no cambia nada) | Idempotente (repetirlo deja lo mismo) |
|---|---|---|
| GET | Sí | Sí |
| PUT | No | Sí |
| DELETE | No | Sí (el efecto; la segunda respuesta puede ser 404) |
| PATCH | No | Depende |
| POST | No | No: cada llamada crea un recurso |

| Código | Significa en la tienda |
|---|---|
| 401 Unauthorized | No mandaste token o no es válido: "¿quién eres?" |
| 403 Forbidden | Sabemos quién eres, pero no puedes: usuario bloqueado |
| 409 Conflict | La petición choca con el estado actual: transición no permitida |

```ts
const { token } = await (await request.post('/api/login', { data: { usuario, contrasena } })).json();
await request.get('/api/pedidos', { headers: { Authorization: `Bearer ${token}` } });
```

La API completa de pedidos está documentada al inicio de `app/pedidos.mjs`.

## Lab (4 h + 8 h de práctica)

Resuelve las 6 pruebas pendientes de `lab.spec.ts`. Para practicar con otra API con
autenticación, usa `restful-booker.herokuapp.com`.

## Preguntas de repaso (preguntas B de REST API del examen)

1. ¿Qué significa que un método HTTP sea idempotente?
2. ¿Qué son los headers y por qué importan?
3. ¿Qué diferencia hay entre 401 y 403?
