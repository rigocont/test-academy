# M2.2 Page Object Model (18 h)

## Objetivo

Separar el "cómo" (locators y pasos) del "qué" (lo que valida la prueba) con Page Objects.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 15 min | El problema: cambia un botón y se rompen 40 pruebas |
| 30 min | Demo: construir `PaginaLogin` en vivo |
| 25 min | Qué va en el Page Object y qué va en la prueba |
| 20 min | Componentes reutilizables: el `Encabezado` |

## Conceptos clave

| En el Page Object | En la prueba |
|---|---|
| Locators | Aserciones (`expect`) |
| Acciones de la página (`entrar`, `agregar`) | Los datos del caso |
| Esperas propias de la página (`esperarCarga`) | El orden de los pasos del caso |

```ts
// Page Object: expone locators y acciones, sin aserciones del caso de prueba
export class PaginaCarrito extends PaginaBase {
  readonly ruta = '/carrito.html';
  get total(): Locator { return this.page.getByTestId('total'); }
  async quitar(nombre: string) {
    await this.fila(nombre).getByRole('button', { name: 'Quitar' }).click();
  }
}

// Prueba: se lee como el caso de prueba
await carrito.quitar('Taza térmica');
await expect(carrito.total).toHaveText('$99 MXN');
```

**Decisiones de diseño del framework:**

- Los locators se exponen como `get` para que se evalúen cuando se usan.
- Los métodos que reciben un nombre (`tarjeta(nombre)`, `fila(nombre)`) devuelven un `Locator`, no hacen clic. Así la prueba decide qué hacer con él.
- `entrarComo()` sí valida que llegó a productos: es una precondición de la página, no del caso.

## Lab (4 h + 12 h de práctica)

1. Lee `framework/componentes/Encabezado.ts` y `framework/paginas/PaginaBase.ts`.
2. Completa los 4 Page Objects marcados con ✏️ M2.2 en el [README del nivel](../README.md).
3. Corre `npx playwright test m2.2` hasta que las 6 pruebas pasen. No modifiques `lab.spec.ts`.

## Preguntas de repaso (pregunta B de Automatización del examen)

1. ¿Qué es el Page Object Model?
2. ¿Por qué el Page Object no hace `expect` del resultado del caso?
3. Si cambia el texto del botón "Entrar", ¿cuántos archivos tienes que tocar?
