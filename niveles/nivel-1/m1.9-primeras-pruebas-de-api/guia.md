# M1.9 Primeras pruebas de API (12 h)

## Objetivo

Automatizar pruebas de API con Playwright, validando código de estado y contenido de la respuesta.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 15 min | Por qué probar por API: más rápido y más estable que por UI |
| 30 min | El fixture `request`: `get`, `post`, `delete`, `params`, `data` |
| 25 min | Validar status, body y errores |
| 20 min | Datos de prueba: dejar el ambiente como estaba |

## Conceptos clave

```ts
test('GET de un producto', async ({ request }) => {
  const respuesta = await request.get('/api/productos/3');   // usa la baseURL
  expect(respuesta.status()).toBe(200);
  const producto = await respuesta.json();
  expect(producto.nombre).toBe('Audífonos inalámbricos');
});

// Query params
await request.get('/api/productos', { params: { categoria: 'hogar' } });

// Body en JSON
await request.post('/api/usuarios', { data: { nombre: 'Rosa', correo: 'rosa@ejemplo.com' } });

// Validar que fue 2xx
await expect(respuesta).toBeOK();

// Validar solo algunos campos de un objeto
expect(usuario).toMatchObject({ nombre: 'Rosa', rol: 'qa' });
expect(usuario.id).toEqual(expect.any(Number));
```

**Qué validar además del status:** los campos y sus tipos, los mensajes de error, que lo creado
se pueda consultar y que lo borrado ya no exista.

**Datos de prueba:** las pruebas que crean o borran cambian el servidor. En este lab cada prueba
llama a `/api/reiniciar` al empezar y el archivo corre en serie para que no se pisen.
En el Nivel 2 se aprende a aislar datos para poder correr en paralelo.

## Lab (4 h + 6 h de práctica)

1. Resuelve las 6 pruebas pendientes de `lab.spec.ts`.
2. Automatiza los 5 endpoints que documentaste en M0.9.

## Preguntas de repaso (preguntas A y B de REST API del examen)

1. ¿Qué es un código de estado? Menciona algunos.
2. ¿Cómo validas una respuesta más allá del código de estado?
3. ¿Por qué esta suite corre en serie?

## Para el instructor

- Muestra cómo la misma validación por UI (productos de "hogar") tarda varias veces más que por API.
