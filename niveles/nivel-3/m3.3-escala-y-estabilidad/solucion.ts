export interface PruebaMedida {
  nombre: string;
  duracionMs: number;
}

export function repartirEnShards(pruebas: PruebaMedida[], shards: number): string[][] {
  if (shards < 1) throw new Error('Se necesita al menos 1 shard');
  const grupos = Array.from({ length: shards }, () => ({ total: 0, nombres: [] as string[] }));
  const ordenadas = [...pruebas].sort((a, b) => b.duracionMs - a.duracionMs);
  for (const prueba of ordenadas) {
    let menor = grupos[0];
    for (const grupo of grupos) if (grupo.total < menor.total) menor = grupo;
    menor.total += prueba.duracionMs;
    menor.nombres.push(prueba.nombre);
  }
  return grupos.map((g) => g.nombres);
}

export type Clasificacion = 'estable' | 'inestable' | 'rota' | 'sin datos';

export function clasificarPrueba(historial: boolean[]): Clasificacion {
  if (historial.length === 0) return 'sin datos';
  if (historial.every(Boolean)) return 'estable';
  if (historial.every((r) => !r)) return 'rota';
  return 'inestable';
}

export function tasaDeInestabilidad(historiales: Record<string, boolean[]>): number {
  const clasificaciones = Object.values(historiales)
    .map(clasificarPrueba)
    .filter((c) => c !== 'sin datos');
  if (clasificaciones.length === 0) return 0;
  const inestables = clasificaciones.filter((c) => c === 'inestable').length;
  return Math.round((inestables / clasificaciones.length) * 1000) / 10;
}
