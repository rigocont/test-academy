# Notas del ponente: M3.3 Escala y estabilidad

## Antes de la clase

- Prepara una suite con las 4 versiones inestables comentadas en `lab.spec.ts` (descoméntalas en una rama tuya).
- Corre esa suite con `--repeat-each=10 --workers=8` antes de clase para saber cuántas fallas esperar.

## Guion de la sesión

1. **Workers y paralelismo (20 min).** `fullyParallel`, `workers` y `test.describe.configure({ mode })`. Muestra en el reporte cómo se reparten las pruebas entre workers.
2. **Sharding (20 min).** `--shard=1/4`: cada máquina corre una parte. Repartir por duración evita que un shard tarde el doble.
3. **Análisis en vivo (40 min).** Corre la suite inestable con `--repeat-each=10 --workers=8`. Para cada falla, el grupo la clasifica con la tabla de causas de la guía (datos compartidos, espera fija, orden de la lista, carrera con la carga inicial, dependencia entre pruebas).
4. **Las 5 causas y su arreglo (20 min).** Corrige una de cada tipo en vivo y vuelve a correr.
5. **Reintentos y cuarentena (20 min).** `retries` es una red de seguridad, no un arreglo. Una prueba `flaky` en el reporte es un bug con dueño. Cuarentena con `test.fixme()` y ticket, máximo 2 semanas.

## Errores comunes

- Subir `retries` para que el CI quede verde.
- Poner `mode: 'serial'` en todo para evitar problemas de datos.
- Medir la estabilidad con una sola corrida.

## Respuestas de referencia

1. `count()` lee una sola vez el número de elementos; `toHaveCount()` reintenta hasta que coincide o se acaba el tiempo.
2. Las siguientes pruebas del grupo se saltan: no sabes si funcionan.
3. Depende de la meta de tiempo y del costo: con meta de 10 minutos, unos 4 o 5 shards, más el tiempo de arranque de cada máquina. Se ajusta midiendo.
4. En la preparación de datos contra servicios inestables que no son lo que se prueba, o en el CI como red de seguridad mientras se arregla la causa.

## Cierre

En su suite real: `--repeat-each=10`, clasificar las fallas y arreglar las 3 más frecuentes. Pide el tiempo antes y después de `fullyParallel`.
