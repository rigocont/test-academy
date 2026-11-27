# Notas del ponente: M2.15 Diseño de pruebas aplicado

## Antes de la clase

- Ten el objeto `TRANSICIONES` de `app/pedidos.mjs` para revisar la tabla al final (no lo muestres antes).
- Lleva una historia de usuario real (sin datos sensibles) para el último bloque.

## Guion de la sesión

1. **Límites y particiones (20 min).** Repaso rápido con la cantidad de 1 a 10. Pregunta cuántas pruebas hacen falta (4: 0, 1, 10, 11) y por qué no 10.
2. **Transición de estados (25 min).** Dibuja el diagrama del pedido. Llenen juntos la primera fila de la tabla (pendiente → ...). Pregunta qué código debe devolver una transición inválida (409).
3. **Tablas de decisión (25 min).** Ejemplo: envío gratis si el total pasa de $1 000 **y** el cliente es frecuente, o si hay cupón. Construyan las combinaciones y vean cuáles colapsan en el mismo resultado.
4. **De la historia a la lista de pruebas (20 min).** Con la historia real, que el grupo proponga pruebas y diga qué técnica usa cada una.

## Errores comunes

- Probar solo las transiciones válidas.
- Probar las 20 inválidas a mano en lugar de generarlas desde la tabla.
- Partir de la implementación (`TRANSICIONES`) en lugar del requisito: si el código tiene el bug, la prueba lo copia.

## Respuestas de referencia

1. Aplicando técnicas (particiones, límites, transiciones, tablas de decisión) sobre los requisitos y revisando la matriz de cobertura por riesgo, no por cantidad de pruebas.
2. Cuatro: 0 y 1 (límite inferior), 10 y 11 (límite superior). Se puede agregar un valor medio como representante de la partición válida.

## Cierre

Primero el diagrama y la tabla en el PR, después el código. Las 25 combinaciones se escriben una sola vez con un ciclo.
