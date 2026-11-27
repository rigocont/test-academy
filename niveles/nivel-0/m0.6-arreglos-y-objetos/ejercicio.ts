// M0.6 Arreglos y objetos
// Los datos de prueba casi siempre son arreglos de objetos. Aquí practicas
// map, filter y find con los productos de la tienda de práctica.
// Corre las pruebas con:  npx playwright test m0.6

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

export const productos: Producto[] = [
  { id: 1, nombre: 'Mochila de viaje', precio: 899, categoria: 'accesorios' },
  { id: 2, nombre: 'Lámpara de escritorio', precio: 459, categoria: 'hogar' },
  { id: 3, nombre: 'Audífonos inalámbricos', precio: 1299, categoria: 'electronica' },
  { id: 4, nombre: 'Taza térmica', precio: 249, categoria: 'hogar' },
  { id: 5, nombre: 'Teclado mecánico', precio: 1599, categoria: 'electronica' },
  { id: 6, nombre: 'Cuaderno de notas', precio: 99, categoria: 'papeleria' },
];

/** 1. Devuelve solo los nombres. Usa map. */
export function nombres(lista: Producto[]): string[] {
  // TODO
  return [];
}

/** 2. Devuelve los productos con precio menor o igual al máximo. Usa filter. */
export function hastaPrecio(lista: Producto[], maximo: number): Producto[] {
  // TODO
  return [];
}

/** 3. Busca un producto por id. Si no existe devuelve undefined. Usa find. */
export function buscarPorId(lista: Producto[], id: number): Producto | undefined {
  // TODO
  return undefined;
}

/** 4. Devuelve los nombres de una categoría, ordenados alfabéticamente. Combina filter, map y sort. */
export function nombresDeCategoria(lista: Producto[], categoria: string): string[] {
  // TODO
  return [];
}

/**
 * 5. Crea un objeto de usuario de prueba nuevo.
 *    El correo se arma con el nombre en minúsculas: "Ana" → "ana@ejemplo.com".
 *    El rol es "qa" si no se indica otro.
 */
export interface Usuario {
  nombre: string;
  correo: string;
  rol: string;
}

export function crearUsuario(nombre: string, rol: string = 'qa'): Usuario {
  // TODO
  return { nombre: '', correo: '', rol: '' };
}
