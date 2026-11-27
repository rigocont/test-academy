# M3.12 Pruebas visuales (opcional)

## Objetivo

Detectar cambios visuales que una aserción de texto no ve (un botón encima de otro, un color
roto) sin llenar el CI de falsos positivos.

## Sesión en vivo (1 h, cuándo valen la pena)

| Tiempo | Tema |
|---|---|
| 15 min | Qué detecta y qué no detecta una prueba visual |
| 20 min | `toHaveScreenshot`: imagen de referencia, umbrales y máscaras |
| 25 min | Por qué fallan entre máquinas: fuentes, sistema operativo, animaciones |

## Conceptos clave

```ts
test('tarjeta de producto', async ({ page }) => {
  await page.goto('/productos.html');
  await expect(page.getByTestId('producto-1')).toHaveScreenshot('producto-1.png', {
    maxDiffPixelRatio: 0.01,          // tolera 1 % de píxeles distintos
    animations: 'disabled',
    mask: [page.locator('.precio')],  // tapa lo que cambia seguido
  });
});
```

```bash
npx playwright test --update-snapshots   # crea o actualiza las imágenes de referencia
```

- La primera corrida **falla a propósito** y crea la imagen de referencia. Revísala antes de hacer commit.
- Las imágenes dependen del sistema operativo y del navegador (el nombre incluye `-chromium-linux`).
  Genera las de referencia en el mismo lugar donde corre el CI, por ejemplo con la imagen Docker de Playwright:
  `docker run --rm -v $(pwd):/work -w /work mcr.microsoft.com/playwright:v1.63.0-noble npx playwright test --update-snapshots`.
- Haz capturas de **componentes**, no de páginas completas: fallan menos y el diff se entiende.
- Usa visuales para lo que importa verse bien (checkout, landing), no para todo.

## Lab (práctica libre)

Agrega 5 pruebas visuales a tu framework: tarjeta de producto, carrito con 2 productos, error de
checkout, tabla de pedidos (con máscara en la columna de cliente) y el diálogo de detalle.
Este módulo no tiene `lab.spec.ts` en el repo porque las imágenes de referencia dependen de cada máquina.

## Preguntas de repaso

1. ¿Por qué una prueba visual pasa en tu Mac y falla en el CI de Linux?
2. ¿Qué enmascaras en una tabla con datos que cambian?
3. ¿Quién debe aprobar una actualización de las imágenes de referencia?
