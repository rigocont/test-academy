# M3.7 Seguridad y observabilidad de APIs (10 h)

## Objetivo

Agregar a la suite las pruebas de seguridad que un QA puede correr en cada PR, y usar ids de
correlación y logs para encontrar problemas que no se ven en el status code.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 30 min | OWASP API Security Top 10 visto desde las pruebas |
| 20 min | Matriz de autorización: cada ruta × cada rol × sin token |
| 15 min | XSS: por qué los datos del usuario se muestran como texto |
| 25 min | Observabilidad: X-Request-Id, logs, distributed tracing. "Un 200 que está mal" |

## Conceptos clave

| Riesgo (OWASP API Top 10) | Prueba que puedes automatizar |
|---|---|
| API1 Autorización a nivel objeto (BOLA) | El usuario A pide `/pedidos/:id` del usuario B → 403 o 404 |
| API2 Autenticación rota | Sin token, token inválido, token expirado → 401 |
| API3 Propiedades a nivel objeto (asignación masiva) | Mandar `estado`, `total`, `rol` en el POST → se ignoran |
| API4 Consumo sin límite | `porPagina=100000` → se limita o responde 400 |
| API5 Autorización a nivel función | Un usuario normal llama a una ruta de admin → 403 |

- **Genera las pruebas desde una tabla.** Una lista `RUTAS_PROTEGIDAS` y un `for` producen la matriz
  completa. Cuando alguien agrega una ruta, la agrega a la lista y obtiene sus pruebas.
- **XSS:** guarda un dato con HTML (`<img src=x onerror=...>`) y valida que la página lo muestra como texto
  y que el script NO corrió. En esta app, `pedidos.html` escapa el cliente con `escapar()`.
- **Id de correlación:** el servidor regresa `X-Request-Id` en cada respuesta. Si tu prueba lo manda,
  puedes buscar en los logs del backend exactamente esa petición. Corre el servidor con
  `LOG_PETICIONES=1 npm run app` para ver los ids.
- **Distributed tracing** (OpenTelemetry, Jaeger, Datadog): el mismo id viaja por todos los servicios.
  Cuando una prueba falla, pega el id en la herramienta y ves en qué servicio se rompió.
- **"Un 200 que está mal":** respuesta exitosa con datos de otro usuario, o un total calculado mal. Los
  esquemas (M3.5) y las aserciones de negocio lo atrapan; el status code no.
- **HATEOAS:** algunas APIs incluyen en la respuesta los links de lo que puedes hacer después
  (`_links: { pagar: ... }`). Prueba que solo aparecen las acciones permitidas para ese estado.

## Lab (3 h + 5 h de práctica)

Resuelve `lab.spec.ts`. Corre `npx playwright test m3.7`.

**Reto:** quita `escapar()` de `app/public/pedidos.html`, corre la prueba de XSS y confirma que falla.
Regresa el cambio.

## Preguntas de repaso

1. ¿Por qué 404 puede ser mejor respuesta que 403 cuando alguien pide un pedido ajeno?
2. ¿Qué diferencia hay entre autenticación y autorización?
3. Una prueba falla con un 500 en el CI. ¿Cómo usas el X-Request-Id para encontrar la causa?
4. ¿Qué pruebas de seguridad NO le tocan a QA y a quién sí?
