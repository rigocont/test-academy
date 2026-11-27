// M2.7 Colecciones y datos
// Leer datos de prueba de archivos y organizarlos con Map y Set.
// Corre las pruebas con:  npx playwright test m2.7

export interface FilaProducto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

/**
 * 1. Convierte un CSV con encabezado en objetos.
 *    - La primera línea son los nombres de columna.
 *    - Ignora líneas vacías y espacios alrededor de cada valor.
 *    - id y precio se convierten a number.
 */
export function leerCsv(texto: string): FilaProducto[] {
  // TODO
  return [];
}

/** 2. Agrupa los productos por categoría usando un Map<categoria, FilaProducto[]>. */
export function agruparPorCategoria(productos: FilaProducto[]): Map<string, FilaProducto[]> {
  // TODO
  return new Map();
}

/** 3. Devuelve las categorías sin repetir, en el orden en que aparecen. Usa un Set. */
export function categoriasUnicas(productos: FilaProducto[]): string[] {
  // TODO
  return [];
}

/**
 * 4. Encuentra los ids repetidos (útil para validar que una API no devuelve duplicados).
 *    Devuelve cada id repetido una sola vez, en orden ascendente.
 */
export function idsDuplicados(ids: number[]): number[] {
  // TODO
  return [];
}

/**
 * 5. Compara lo que esperabas contra lo que devolvió la app y lista las diferencias de precio.
 *    Devuelve textos como "Taza térmica: esperado 249, recibido 259".
 *    Si un producto esperado no viene en `recibidos`, agrega "Mochila de viaje: no encontrado".
 */
export function diferenciasDePrecio(esperados: FilaProducto[], recibidos: FilaProducto[]): string[] {
  // TODO
  return [];
}
