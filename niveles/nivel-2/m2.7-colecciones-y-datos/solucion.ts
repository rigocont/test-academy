export interface FilaProducto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

export function leerCsv(texto: string): FilaProducto[] {
  const [encabezado, ...lineas] = texto
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const columnas = encabezado.split(',').map((c) => c.trim());
  return lineas.map((linea) => {
    const valores = linea.split(',').map((v) => v.trim());
    const fila: Record<string, string> = {};
    columnas.forEach((columna, i) => (fila[columna] = valores[i]));
    return { id: Number(fila.id), nombre: fila.nombre, precio: Number(fila.precio), categoria: fila.categoria };
  });
}

export function agruparPorCategoria(productos: FilaProducto[]): Map<string, FilaProducto[]> {
  const grupos = new Map<string, FilaProducto[]>();
  for (const p of productos) {
    const grupo = grupos.get(p.categoria) ?? [];
    grupo.push(p);
    grupos.set(p.categoria, grupo);
  }
  return grupos;
}

export function categoriasUnicas(productos: FilaProducto[]): string[] {
  return [...new Set(productos.map((p) => p.categoria))];
}

export function idsDuplicados(ids: number[]): number[] {
  const vistos = new Set<number>();
  const repetidos = new Set<number>();
  for (const id of ids) {
    if (vistos.has(id)) repetidos.add(id);
    vistos.add(id);
  }
  return [...repetidos].sort((a, b) => a - b);
}

export function diferenciasDePrecio(esperados: FilaProducto[], recibidos: FilaProducto[]): string[] {
  const porId = new Map(recibidos.map((r) => [r.id, r]));
  const diferencias: string[] = [];
  for (const e of esperados) {
    const r = porId.get(e.id);
    if (!r) diferencias.push(`${e.nombre}: no encontrado`);
    else if (r.precio !== e.precio) diferencias.push(`${e.nombre}: esperado ${e.precio}, recibido ${r.precio}`);
  }
  return diferencias;
}
