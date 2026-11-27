# Notas del ponente: M2.2 Page Object Model

## Antes de la clase

- Ten abierto `framework/paginas/PaginaLogin.ts` vacío (stub) y su `.solucion.ts` como referencia, sin mostrarlo.
- Abre `m2.2-page-object-model/lab.spec.ts`: las pruebas ya están escritas y usan los Page Objects.

## Guion de la sesión

1. **El problema (15 min).** Busca con el editor cuántas veces aparece `getByRole('button', { name: 'Entrar' })` en los labs del Nivel 1. Si cambia el botón, se rompen todos.
2. **Construir `PaginaLogin` en vivo (30 min).** Locators como `get`, el método `entrar(usuario, contrasena)` y `entrarComo(usuario)` que valida que llegó a productos. Usa la clase en una prueba y córrela.
3. **Qué va dónde (25 min).** Con la tabla de la guía: locators y acciones en el Page Object; aserciones del caso y datos en la prueba. Muestra un Page Object con `expect(total).toHaveText('$597')` dentro y explica por qué es mala idea: ese valor es del caso, no de la página.
4. **Componentes reutilizables (20 min).** El `Encabezado` aparece en todas las páginas: es un componente que las páginas *tienen*. Recorre su código.

## Errores comunes

- Métodos que hacen `expect` del resultado del caso.
- Locators guardados como propiedades en el constructor en lugar de `get` (funciona en Playwright, pero esconde cuándo se evalúan).
- Métodos con nombres técnicos (`clickBoton2`) en lugar de acciones del usuario (`finalizarCompra`).
- Modificar `lab.spec.ts` para que pase: el ejercicio es completar el framework.

## Respuestas de referencia

1. Un patrón que representa cada página como una clase con sus locators y acciones, para que las pruebas hablen en lenguaje de negocio y los cambios de la UI se corrijan en un solo lugar.
2. Porque el resultado esperado pertenece al caso; la misma acción puede tener resultados distintos según los datos.
3. Uno: el Page Object de login.

## Cierre

Los 4 Page Objects marcados con ✏️ M2.2 en el README del nivel. No se toca `lab.spec.ts`.
