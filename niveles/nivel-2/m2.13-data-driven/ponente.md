# Notas del ponente: M2.13 Pruebas data-driven

## Antes de la clase

- Ten el `leerCsv` de M2.7 funcionando y `framework/datos/productos.csv` abierto.
- Prepara un ejemplo de keyword-driven (una tabla de pasos de Robot Framework o una lista de acciones) para comparar.

## Guion de la sesión

1. **Data-driven vs keyword-driven (20 min).** En data-driven cambian los datos y los pasos son los mismos; en keyword-driven, los pasos se describen con palabras clave. Muestra ambos ejemplos.
2. **Generar pruebas con un ciclo (25 min).** Escribe el ciclo de códigos postales de la guía y corre `npx playwright test m2.13 --list`. Cada caso es una prueba en el reporte.
3. **Datos desde archivos (25 min).** Genera una prueba por fila de `productos.csv`. Rompe un precio en el CSV y muestra que el nombre de la prueba dice cuál falló.
4. **Límites y particiones como tablas (20 min).** La cantidad acepta de 1 a 10: casos 0, 1, 10 y 11. El nombre del cliente: vacío, 1 carácter, 2, 50, 51.

## Errores comunes

- Nombres de prueba sin el dato: "caso 3 falla" no dice nada.
- Dos casos con el mismo nombre: Playwright los marca como duplicados.
- Leer el archivo dentro de la prueba en lugar de al cargar el módulo (no se pueden generar las pruebas).

## Respuestas de referencia

1. Data-driven separa los datos de la lógica: la misma prueba corre con muchos datos. Keyword-driven separa los pasos en palabras clave reutilizables que se combinan en una tabla, a veces por gente que no programa.
2. Para saber qué caso falló leyendo solo el reporte o la notificación del CI.

## Cierre

Completan las secciones 2, 3 y 4 del lab: valores límite de cantidad, particiones del nombre y casos del CSV.
