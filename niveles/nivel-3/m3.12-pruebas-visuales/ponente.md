# Notas del ponente: M3.12 Pruebas visuales (opcional)

## Antes de la clase

- Crea una prueba visual de la tarjeta de producto y genera su imagen de referencia.
- Prepara un cambio de CSS pequeño (un margen o un color) para mostrar el diff.

## Guion de la sesión

1. **Qué detecta y qué no (15 min).** Detecta elementos encimados, colores rotos y textos cortados. No detecta si el dato es correcto ni si la página funciona.
2. **`toHaveScreenshot` (20 min).** Primera corrida (falla y crea la referencia), cambio de CSS y el diff en el reporte: esperado, actual y diferencia. Agrega `maxDiffPixelRatio`, `animations: 'disabled'` y `mask` sobre el precio.
3. **Diferencias entre máquinas (25 min).** Muestra el nombre del archivo de referencia (`-chromium-linux`). Explica por qué una imagen de Mac falla en el CI de Linux (fuentes y antialiasing) y la solución con la imagen Docker de Playwright.

## Errores comunes

- Capturas de páginas completas con datos que cambian.
- Actualizar las referencias con `--update-snapshots` sin revisar el cambio.
- Umbrales tan altos que nada falla.

## Respuestas de referencia

1. Porque el sistema operativo dibuja fuentes y bordes distintos; las referencias se generan en el mismo sistema que corre el CI.
2. Las columnas con datos variables (cliente, fechas, totales) o la tabla completa si solo importa su estructura.
3. Alguien de diseño o el dueño del producto junto con QA: decide si el cambio visual es intencional.

## Cierre

Práctica libre: 5 pruebas visuales en su framework. No hay `lab.spec.ts` en el repo porque las referencias dependen de cada máquina.
