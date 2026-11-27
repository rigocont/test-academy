# M3.5 API avanzada (16 h)

## Objetivo

Validar contratos completos con esquemas en lugar de campo por campo, y probar APIs asíncronas
sin esperas fijas.

## Sesión en vivo (2 h, diseñar validadores)

| Tiempo | Tema |
|---|---|
| 20 min | Por qué `expect(body.total).toBe(498)` no basta: el contrato es la forma completa |
| 40 min | zod: `object`, `enum`, `array`, `strict`, `discriminatedUnion`, `safeParse` |
| 20 min | Esquemas como fuente de tipos: `z.infer<typeof EsquemaPedido>` |
| 25 min | APIs asíncronas: 202 Accepted y `expect.poll` |
| 15 min | Contract testing entre equipos (introducción, se profundiza en T4.6) |

## Conceptos clave

```ts
const EsquemaPedido = z.object({
  id: z.number().int().positive(),
  estado: z.enum(['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado']),
  // ...
}).strict();                       // un campo nuevo también es un cambio de contrato

type Pedido = z.infer<typeof EsquemaPedido>;   // el tipo sale del esquema: una sola fuente de verdad

EsquemaPedido.parse(cuerpo);       // lanza un error que dice qué campo no cumple
EsquemaPedido.safeParse(cuerpo);   // { success: false, error } sin lanzar
```

```ts
// API asíncrona: POST responde 202 y el trabajo termina después.
await expect
  .poll(async () => (await (await request.get(`/api/reportes/${id}`)).json()).estado, {
    timeout: 5000,
    intervals: [250, 500, 1000],   // opcional: cada cuánto vuelve a preguntar
  })
  .toBe('listo');
```

- `.strict()` es una decisión: detecta campos nuevos, pero rompe la prueba cuando el backend agrega uno
  compatible. Úsalo en contratos que tu equipo controla.
- Valida también las **respuestas de error**: el frontend depende de `{ error }` tanto como del caso feliz.
- `expect.poll` reintenta la función, no la aserción completa. Para varios `expect` juntos usa `expect(async () => {...}).toPass()`.
- La alternativa a zod es **AJV** con JSON Schema, útil cuando el backend ya publica un OpenAPI.

## Lab (4 h + 10 h de práctica)

1. Completa `esquemas.ts`.
2. Resuelve `lab.spec.ts`. Corre `npx playwright test m3.5`.
3. **En tu framework:** agrega un esquema por endpoint en `clientes/esquemas.ts` y valida en el cliente,
   no en cada prueba. Así cada prueba de API valida el contrato sin escribir nada extra.

## Preguntas de repaso

1. ¿Qué detecta un esquema que no detectan 5 `expect` sueltos?
2. ¿Por qué validar dentro del cliente de API y no en cada prueba?
3. ¿Cuándo `.strict()` hace más daño que bien?
4. ¿Qué pasa con `expect.poll` si el reporte nunca termina?
