# Notas del ponente: M1.5 Esperas

## Antes de la clase

- Prepara la prueba del reporte de ventas con `waitForTimeout(1500)`. El reporte tarda entre 1 y 3 s al azar, así que fallará algunas veces.
- Ten lista la terminal con `npx playwright test m1.5 --repeat-each=10`.

## Guion de la sesión

1. **Por qué fallan "a veces" (20 min).** La prueba es más rápida que la app: busca algo que todavía no existe. Pregunta quién ha tenido una prueba que pasa en su máquina y falla en el CI.
2. **Auto-waiting (25 min).** Antes de un `click` Playwright revisa que el elemento exista, sea visible, esté estable, habilitado y reciba eventos. Haz login con el usuario `lento` (1.5 s) sin agregar ninguna espera y muestra que funciona.
3. **Demo del reporte (25 min).** Corre la versión con `waitForTimeout` con `--repeat-each=10` y cuenta las fallas. Cámbiala por `await expect(page.getByRole('status')).toHaveText('Reporte listo')` y vuelve a correr: 10 de 10 y más rápido.
4. **Navegación y red (20 min).** `toHaveURL` para navegación. `waitForResponse` preparado antes de la acción. Muestra qué pasa si lo pones después: la respuesta ya llegó y la espera no termina.

## Errores comunes

- Subir el `waitForTimeout` en lugar de esperar una condición.
- Subir el timeout global de la configuración para que pase.
- Poner `await page.waitForResponse(...)` después de la acción que provoca la petición.

## Respuestas de referencia

1. Con una aserción web-first sobre la condición que importa (`toBeVisible`, `toHaveText`), o confiando en el auto-waiting de la acción.
2. Si la app tarda más que la espera, falla; si tarda menos, desperdicias ese tiempo en cada corrida.
3. Porque la respuesta puede llegar antes de que empieces a escuchar y la espera nunca se cumple.

## Cierre

Criterio de aceptación del lab: la prueba del reporte pasa con `--repeat-each=10`. Pide la captura de esa corrida en el PR.
