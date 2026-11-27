# M2.5 Sincronización y casos difíciles (14 h)

## Objetivo

Automatizar diálogos del navegador, pestañas nuevas, iframes y archivos.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 25 min | Diálogos: `alert`, `confirm`, `prompt` |
| 20 min | Pestañas y ventanas nuevas |
| 20 min | iframes |
| 25 min | Subir y descargar archivos |

## Conceptos clave

**La regla de los eventos:** registra la espera **antes** de la acción que la provoca.

```ts
// Diálogos: Playwright los rechaza solos si nadie los maneja.
page.once('dialog', (d) => d.accept());          // o d.dismiss(), o d.accept('texto') en un prompt
await page.getByRole('button', { name: 'Vaciar carrito' }).click();

// Pestaña nueva
const popupPromesa = page.waitForEvent('popup');
await page.getByRole('link', { name: 'Abrir manual de usuario' }).click();
const manual = await popupPromesa;

// iframe: los locators de la página no ven lo que hay dentro
const soporte = page.getByTitle('Soporte').contentFrame();
await soporte.getByLabel('Tu consulta').fill('Hola');

// Subir archivo
await page.getByLabel('Subir archivo de productos').setInputFiles('ruta/al/archivo.csv');

// Descargar archivo
const descargaPromesa = page.waitForEvent('download');
await page.getByRole('button', { name: 'Descargar inventario' }).click();
const descarga = await descargaPromesa;
const ruta = await descarga.path();
```

## Lab (4 h + 10 h de práctica)

Resuelve las 7 pruebas pendientes de `lab.spec.ts`. Para practicar más, usa
`the-internet.herokuapp.com` (frames, ventanas múltiples, cargas y descargas).

## Preguntas de repaso (pregunta B de Automatización del examen)

1. ¿Cómo manejas el comportamiento asíncrono en la automatización de UI?
2. ¿Por qué `waitForEvent('popup')` va antes del clic?
3. ¿Por qué `page.getByLabel('Tu consulta')` no encuentra el campo del widget?
