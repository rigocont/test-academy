# Nivel 2. Intermediate

Material de clase del [temario del Nivel 2](../../docs/temario/nivel-2-intermediate.md).
En este nivel construyes un **framework de automatización** real en `framework/` y lo usas
en todos los labs. Al terminar tienes un proyecto que puedes llevar a tu equipo.

```text
framework/
├── soporte.ts              porResolver() y constantes
├── componentes/
│   └── Encabezado.ts       ✅ completo: úsalo de ejemplo
├── paginas/
│   ├── PaginaBase.ts       ✅ completo: clase base de todas las páginas
│   ├── PaginaLogin.ts      ✏️ M2.2
│   ├── PaginaProductos.ts  ✏️ M2.2
│   ├── PaginaCarrito.ts    ✏️ M2.2
│   ├── PaginaCheckout.ts   ✏️ M2.2
│   └── PaginaPedidos.ts    ✏️ M2.4
├── clientes/
│   ├── tipos.ts            ✅ tipos de la API
│   ├── ClienteApi.ts       ✅ clase base y obtenerToken()
│   └── ClientePedidos.ts   ✏️ M2.12
├── datos/
│   ├── generadores.ts      ✅ clienteUnico() y nuevoPedido()
│   └── productos.csv       datos de prueba
└── fixtures.ts             ✏️ M2.3 y M2.14
```

Los archivos `*.solucion.ts` son la referencia del instructor.

## Tipos de lab

| Archivo | Qué haces |
|---|---|
| `lab.spec.ts` con `porResolver()` | Escribes las pruebas |
| `lab.spec.ts` completo | Las pruebas ya están: completas el framework hasta que pasen |
| `ejercicio.ts` | Completas el código; `ejercicio.spec.ts` lo valida |

```bash
npm run test:nivel2              # todo el nivel
npx playwright test m2.4 --ui    # un módulo en modo UI
```

## La regla de los datos

Las pruebas corren en paralelo contra el mismo servidor. **Ninguna prueba modifica datos
que otra pueda usar.** Cada prueba crea sus propios pedidos con `clienteUnico()` y busca solo
por ese cliente. Si una prueba necesita un pedido "pagado", lo crea y lo paga ella misma.

## Módulos

### Bloque 2A. Código de pruebas mantenible

| # | Módulo | Guía | Lab |
|---|---|---|---|
| M2.1 | OOP aplicada a pruebas | [guía](m2.1-oop-aplicada/guia.md) | `ejercicio.ts` |
| M2.2 | Page Object Model | [guía](m2.2-page-object-model/guia.md) | Completar `framework/paginas/` |
| M2.3 | Fixtures | [guía](m2.3-fixtures/guia.md) | Completar `framework/fixtures.ts` |
| M2.4 | Locators avanzados y estrategia | [guía](m2.4-locators-avanzados/guia.md) | Completar `PaginaPedidos.ts` |
| M2.5 | Sincronización y casos difíciles | [guía](m2.5-casos-dificiles/guia.md) | `lab.spec.ts` |
| M2.6 | Excepciones y depuración | [guía](m2.6-depuracion/guia.md) | 5 pruebas rotas |
| M2.7 | Colecciones y datos | [guía](m2.7-colecciones-y-datos/guia.md) | `ejercicio.ts` |
| M2.8 | Leer y refactorizar código ajeno | [guía](m2.8-refactorizar/guia.md) | Refactorizar `lab.spec.ts` |
| M2.9 | Git en equipo | [guía](m2.9-git-en-equipo/guia.md) | Conflicto guiado |

**Proyecto 2A:** ver [guía de M2.9](m2.9-git-en-equipo/guia.md#proyecto-2a).

### Bloque 2B. API y pruebas guiadas por datos

| # | Módulo | Guía | Lab |
|---|---|---|---|
| M2.10 | REST a fondo | [guía](m2.10-rest-a-fondo/guia.md) | `lab.spec.ts` |
| M2.11 | APIRequestContext | [guía](m2.11-api-request-context/guia.md) | `lab.spec.ts` |
| M2.12 | Utilidades de API reutilizables | [guía](m2.12-clientes-de-api/guia.md) | Completar `ClientePedidos.ts` |
| M2.13 | Pruebas data-driven | [guía](m2.13-data-driven/guia.md) | `lab.spec.ts` |
| M2.14 | UI + API juntos | [guía](m2.14-ui-y-api/guia.md) | Completar fixture `paginaPedidos` |
| M2.15 | Diseño de pruebas aplicado | [guía](m2.15-diseno-de-pruebas/guia.md) | `lab.spec.ts` |
| M2.16 | Severidad, prioridad y cobertura | [guía](m2.16-severidad-y-cobertura/guia.md) | Matriz de cobertura |

**Proyecto 2B:** ver [guía de M2.16](m2.16-severidad-y-cobertura/guia.md#proyecto-2b).
