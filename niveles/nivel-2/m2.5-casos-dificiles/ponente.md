# Notas del ponente: M2.5 Sincronización y casos difíciles

## Antes de la clase

- Abre `/herramientas.html` en la tienda: tiene alert, confirm, prompt, pestaña nueva, iframe, subida y descarga.
- Ten un archivo CSV pequeño a mano para la demo de subida.

## Guion de la sesión

1. **Diálogos (25 min).** Haz clic en el botón del `confirm` sin manejarlo y muestra que Playwright lo cancela solo. Luego `page.once('dialog', d => d.accept())` antes del clic. Para el `prompt`, `d.accept('texto')`.
2. **Pestañas nuevas (20 min).** `waitForEvent('popup')` antes del clic en "Abrir manual de usuario". Valida el título de la pestaña nueva.
3. **iframes (20 min).** Intenta `page.getByLabel('Tu consulta')` y falla. Explica que el iframe es otro documento y usa `contentFrame()`.
4. **Archivos (25 min).** Sube el CSV con `setInputFiles` y descarga el inventario con `waitForEvent('download')`. Lee el contenido descargado para validarlo.

## Errores comunes

- Registrar `waitForEvent` después de la acción: el evento ya pasó.
- Usar `page.on('dialog')` en lugar de `once` y aceptar diálogos que la prueba no esperaba.
- Validar solo que la descarga existe, sin revisar su contenido.

## Respuestas de referencia

1. Esperando estados y eventos concretos (web-first assertions, `waitForEvent`, `waitForResponse`) registrados antes de la acción, nunca con tiempos fijos.
2. Porque la pestaña se abre durante el clic; si empiezas a escuchar después, el evento ya ocurrió.
3. Porque está dentro de un iframe, que es otro documento; hay que entrar con `contentFrame()` o `frameLocator`.

## Cierre

Son 7 pruebas. Para practicar más: `the-internet.herokuapp.com` (frames, ventanas, cargas y descargas).
