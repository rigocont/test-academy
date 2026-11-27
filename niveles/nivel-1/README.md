# Nivel 1. Beginner

Material de clase del [temario del Nivel 1](../../docs/temario/nivel-1-beginner.md).
Todos los labs corren contra la tienda de práctica del repo (`app/`). Playwright la levanta
solo al correr las pruebas, no tienes que abrirla a mano.

## Cómo se trabaja cada lab

1. Lee la `guia.md` del módulo.
2. Abre `lab.spec.ts`. Cada prueba sin resolver llama a `porResolver('...')` con la instrucción.
3. Borra esa línea, escribe tu código y corre el lab:

   ```bash
   npx playwright test m1.3            # un módulo
   npx playwright test m1.3 --ui       # en modo UI, para ver cada paso
   ```

4. Entrega por pull request. `solucion.spec.ts` es la referencia del instructor.

## Módulos

| # | Módulo | Guía | Lab |
|---|---|---|---|
| M1.1 | Primer proyecto Playwright | [guía](m1.1-primer-proyecto/guia.md) | `lab.spec.ts` |
| M1.2 | Anatomía de una prueba | [guía](m1.2-anatomia-de-una-prueba/guia.md) | `lab.spec.ts` |
| M1.3 | Locators | [guía](m1.3-locators/guia.md) | `lab.spec.ts` |
| M1.4 | Aserciones | [guía](m1.4-aserciones/guia.md) | `lab.spec.ts` |
| M1.5 | Esperas | [guía](m1.5-esperas/guia.md) | `lab.spec.ts` |
| M1.6 | Ejecutar y leer resultados | [guía](m1.6-ejecutar-y-leer-resultados/guia.md) | Actividad guiada |
| M1.7 | Codegen y depuración básica | [guía](m1.7-codegen-y-depuracion/guia.md) | Actividad guiada |
| M1.8 | Organizar pruebas | [guía](m1.8-organizar-pruebas/guia.md) | `lab.spec.ts` |
| M1.9 | Primeras pruebas de API | [guía](m1.9-primeras-pruebas-de-api/guia.md) | `lab.spec.ts` |
| M1.10 | Git en el flujo de pruebas | [guía](m1.10-git-en-el-flujo/guia.md) | Todo el nivel por PR |

## Proyecto final: suite de humo

Crea `niveles/nivel-1/proyecto-final/humo.spec.ts` y córrelo con `npx playwright test humo`. Debe tener:

- **10 pruebas de UI:** login (exitoso y 2 errores), búsqueda, filtro por categoría, agregar al carrito, quitar del carrito, total, checkout exitoso y una validación del checkout.
- **5 pruebas de API:** lista de productos, producto por id, 404, crear usuario y borrar usuario.

**Requisitos:** sin `waitForTimeout`, locators de usuario (`getByRole`, `getByLabel`, `getByText`),
nombres de prueba que digan qué validan, pasa 5 veces seguidas con `--repeat-each=5` y se
entrega por PR con el reporte HTML adjunto.
