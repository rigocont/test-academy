export type TipoDeFalla = 'localizador' | 'tiempo' | 'aserción' | 'red' | 'servidor' | 'desconocido';

const REGLAS: [TipoDeFalla, RegExp][] = [
  ['red', /net::ERR_|ECONNREFUSED/i],
  ['servidor', /(received:?|status)\s*5\d\d\b/i],
  ['localizador', /strict mode violation|resolved to 0 elements|element\(s\) not found/i],
  ['tiempo', /timeout.*exceeded/is],
  ['aserción', /expect\(/i],
];

export function clasificarFalla(mensaje: string): TipoDeFalla {
  return REGLAS.find(([, regla]) => regla.test(mensaje))?.[0] ?? 'desconocido';
}

export function agruparFallas(mensajes: string[]): { tipo: TipoDeFalla; cantidad: number }[] {
  const conteo = new Map<TipoDeFalla, number>();
  for (const mensaje of mensajes) {
    const tipo = clasificarFalla(mensaje);
    conteo.set(tipo, (conteo.get(tipo) ?? 0) + 1);
  }
  return [...conteo.entries()]
    .map(([tipo, cantidad]) => ({ tipo, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad || a.tipo.localeCompare(b.tipo));
}
