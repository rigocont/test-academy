# M2.11 APIRequestContext (16 h)

## Objetivo

Crear contextos de API propios con `baseURL` y headers por defecto para no repetir configuración.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | El fixture `request` vs `request.newContext()` |
| 25 min | `baseURL`, `extraHTTPHeaders` y `dispose()` |
| 25 min | Demo con la API de pedidos |
| 20 min | Aserciones sobre body, headers y status |

## Conceptos clave

```ts
import { request as playwrightRequest } from '@playwright/test';

const api = await playwrightRequest.newContext({
  baseURL: 'http://localhost:3000',
  extraHTTPHeaders: { Authorization: `Bearer ${token}` },
});
await api.get('/api/pedidos', { params: { estado: 'pagado', porPagina: 5 } });
await api.post('/api/pedidos', { data: { cliente, cp, productos } });
await api.dispose();                // libera el contexto al terminar
```

`toMatchObject` valida solo los campos que te importan; `toEqual` exige que todo sea igual:

```ts
expect(pedido).toMatchObject({ estado: 'pendiente', total: 498 });
```

## Lab (4 h + 12 h de práctica)

En `lab.spec.ts` crea `api` en `beforeAll` y resuelve las 5 pruebas.

## Preguntas de repaso

1. ¿Por qué hay que llamar `dispose()`?
2. ¿Cuándo usarías `toMatchObject` en lugar de `toEqual`?
