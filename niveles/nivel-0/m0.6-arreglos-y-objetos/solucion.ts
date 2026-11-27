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

export function nombres(lista: Producto[]): string[] {
  return lista.map((p) => p.nombre);
}

export function hastaPrecio(lista: Producto[], maximo: number): Producto[] {
  return lista.filter((p) => p.precio <= maximo);
}

export function buscarPorId(lista: Producto[], id: number): Producto | undefined {
  return lista.find((p) => p.id === id);
}

export function nombresDeCategoria(lista: Producto[], categoria: string): string[] {
  return lista
    .filter((p) => p.categoria === categoria)
    .map((p) => p.nombre)
    .sort();
}

export interface Usuario {
  nombre: string;
  correo: string;
  rol: string;
}

export function crearUsuario(nombre: string, rol: string = 'qa'): Usuario {
  return { nombre, correo: `${nombre.toLowerCase()}@ejemplo.com`, rol };
}
