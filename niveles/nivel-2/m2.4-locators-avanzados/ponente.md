# Notas del ponente: M2.4 Locators avanzados y estrategia

## Antes de la clase

- Abre `/pedidos.html` en la tienda (necesitas iniciar sesión) y el stub de `framework/paginas/PaginaPedidos.ts`.
- Crea un pedido por API con un cliente único para la demo, así no dependes de los datos semilla.

## Guion de la sesión

1. **Tablas (20 min).** `getByRole('table', { name: 'Pedidos' })`, filas en `tbody tr`, celdas por rol. Muestra los roles en la pestaña de accesibilidad de DevTools.
2. **`filter`, `exact` y `nth` (25 min).** Busca la fila "#1" sin `exact: true` y muestra que también encuentra "#12". Calcula la columna "Estado" leyendo los encabezados en lugar de suponer que es la tercera.
3. **Diálogos y paginación (20 min).** Abre el detalle de un pedido (`<dialog>`) y busca dentro del diálogo. Recorre páginas con "Siguiente" hasta encontrar un pedido.
4. **Pedir testabilidad (25 min).** Ejercicio: ¿qué le pedirían a desarrollo para esta tabla? (`aria-label` en la tabla, `data-testid` por fila con el id del pedido, encabezados claros). Ensayen cómo pedirlo en un ticket.

## Errores comunes

- Usar los pedidos semilla: otra prueba en paralelo los cambia de estado.
- Calcular columnas con índices fijos.
- Buscar en toda la página algo que está dentro del diálogo.

## Respuestas de referencia

1. Porque otras pruebas en paralelo pueden modificar los pedidos existentes; con datos propios el resultado no depende del orden ni de otras pruebas.
2. Cuando la posición es el dato: la columna N calculada desde el encabezado, o el primer elemento de una lista ordenada que se está validando.
3. Un nombre accesible para la tabla, encabezados de columna, y un `data-testid` o atributo con el id del pedido en cada fila.

## Cierre

`celda()` debe calcular la posición leyendo los encabezados: es el criterio principal de la revisión.
