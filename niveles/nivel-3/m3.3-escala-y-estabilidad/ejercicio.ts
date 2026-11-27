// M3.3 Escala y estabilidad: paralelismo, sharding y pruebas inestables.
// Corre las pruebas con:  npx playwright test m3.3

export interface PruebaMedida {
  nombre: string;
  duracionMs: number;
}

/**
 * 1. Reparte las pruebas en `shards` grupos con duración total parecida.
 *    Algoritmo (voraz): ordena de la más lenta a la más rápida y pon cada prueba
 *    en el grupo que lleve MENOS tiempo acumulado (si empatan, el de menor índice).
 *    Devuelve un arreglo de `shards` arreglos con los nombres.
 *    Si shards < 1 lanza Error('Se necesita al menos 1 shard').
 */
export function repartirEnShards(pruebas: PruebaMedida[], shards: number): string[][] {
  // TODO
  return [];
}

export type Clasificacion = 'estable' | 'inestable' | 'rota' | 'sin datos';

/**
 * 2. Clasifica una prueba según su historial de ejecuciones (true = pasó).
 *    - Sin ejecuciones → "sin datos".
 *    - Todas pasaron → "estable". Todas fallaron → "rota". Mezcla → "inestable".
 */
export function clasificarPrueba(historial: boolean[]): Clasificacion {
  // TODO
  return 'sin datos';
}

/**
 * 3. Tasa de inestabilidad de la suite: porcentaje de pruebas "inestables" entre las
 *    que tienen datos, redondeado a 1 decimal. Sin pruebas con datos → 0.
 *    tasaDeInestabilidad({ a: [true], b: [true, false], c: [] }) → 50
 */
export function tasaDeInestabilidad(historiales: Record<string, boolean[]>): number {
  // TODO
  return -1;
}
