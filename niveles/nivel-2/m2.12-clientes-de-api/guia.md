# M2.12 Utilidades de API reutilizables (14 h)

## Objetivo

Construir un cliente de API tipado: el equivalente al Page Object, pero para la API.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | El problema: rutas, headers y JSON repetidos en todas las pruebas |
| 30 min | Diseñar un cliente por recurso: `ClienteApi` y `ClientePedidos` |
| 20 min | Tipar respuestas con `interface` |
| 20 min | Métodos "crudos" y métodos "Ok" |

## Conceptos clave

```ts
export class ClientePedidos extends ClienteApi {
  crear(pedido: NuevoPedido): Promise<APIResponse> {        // crudo: no valida, sirve para probar errores
    return this.post('/api/pedidos', pedido);
  }
  async crearOk(pedido: NuevoPedido): Promise<Pedido> {     // Ok: valida y devuelve el cuerpo tipado
    const respuesta = await this.crear(pedido);
    expect(respuesta.status(), await respuesta.text()).toBe(201);
    return respuesta.json();
  }
}
```

| Usa el método crudo cuando | Usa el método Ok cuando |
|---|---|
| La prueba valida la respuesta (errores, status) | La llamada es preparación de datos |

El fixture `pedidos` del framework ya entrega un `ClientePedidos` con el token puesto.

## Lab (4 h + 10 h de práctica)

Completa `framework/clientes/ClientePedidos.ts`. Corre `npx playwright test m2.12`.

## Preguntas de repaso

1. ¿Qué gana una prueba al usar el cliente en lugar de `request` directo?
2. ¿Por qué `crearOk` incluye el cuerpo de la respuesta en el mensaje del `expect`?
