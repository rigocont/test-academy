# M3.1 Arquitectura de un framework (16 h)

## Objetivo

Diseñar un framework por capas y usar patrones de OOP avanzada (builder, genéricos, clases
abstractas) para que crezca sin volverse un monolito de utilidades.

## Sesión en vivo (2 h, revisión de diseño)

| Tiempo | Tema |
|---|---|
| 20 min | Las capas: pruebas → páginas y clientes → datos → utilidades. Qué conoce a qué |
| 30 min | Revisión en grupo del framework del Nivel 2: qué duele al agregar la prueba 200 |
| 30 min | Patrones: Builder para datos, Repository para fuentes de datos, Strategy para ambientes |
| 20 min | Genéricos y clases abstractas: cuándo ayudan y cuándo son sobreingeniería |
| 20 min | Clean code en pruebas: nombres de negocio, una razón para fallar, sin lógica condicional |

## Conceptos clave

```text
pruebas/          ← hablan en lenguaje de negocio: "crear pedido pagado"
  │
  ├── paginas/    ← cómo se ve la UI (locators, acciones)
  ├── clientes/   ← cómo se habla con la API
  │
  ├── datos/      ← builders y generadores: QUÉ datos usa la prueba
  └── soporte/    ← utilidades sin conocimiento del negocio (reintentar, esperar, logs)
```

- **Regla de dependencias:** una capa solo conoce a las de abajo. Una página nunca importa una prueba;
  `soporte/` no conoce ni páginas ni clientes.
- **Builder:** `new ConstructorPedido().paraCliente('Ana').conProducto(4, 2).construir()` se lee como
  la intención de la prueba y tiene valores válidos por defecto. Cambias solo lo que importa.
- **Genéricos:** `reintentar<T>(fn)` conserva el tipo de lo que devuelve `fn`. Sin genéricos terminas con `any`.
- **Clase abstracta:** define el "esqueleto" y deja a la subclase un solo método (`validar`). Úsala cuando
  hay 3 o más implementaciones parecidas, no antes.
- **Sobrescritura:** una subclase puede cambiar un método de la base (`override`) y llamar a la versión
  original con `super.metodo()`.

## Lab (4 h + 10 h de práctica)

1. Completa `ejercicio.ts` (Builder, `reintentar<T>` y `Repositorio<T>`). Corre `npx playwright test m3.1`.
2. **Rediseño:** dibuja el diagrama de capas de tu framework del Nivel 2. Marca cada import que rompa la
   regla de dependencias y corrígelo. Entrega el diagrama y el PR.

## Preguntas de repaso

1. ¿Por qué una página no debe importar un cliente de API?
2. ¿Qué problema resuelve el builder que no resuelve `nuevoPedido({ ... })`?
3. ¿Cuándo un `reintentar` en el framework esconde un bug real?
4. Da un ejemplo de abstracción prematura que hayas visto.
