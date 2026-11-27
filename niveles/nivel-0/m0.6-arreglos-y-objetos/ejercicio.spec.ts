import { test, expect } from '@playwright/test';
import { productos, nombres, hastaPrecio, buscarPorId, nombresDeCategoria, crearUsuario } from './ejercicio';

test('nombres devuelve un nombre por producto', () => {
  const resultado = nombres(productos);
  expect(resultado).toHaveLength(6);
  expect(resultado[0]).toBe('Mochila de viaje');
});

test('hastaPrecio filtra por precio máximo (incluye el límite)', () => {
  const baratos = hastaPrecio(productos, 459);
  expect(baratos.map((p) => p.id)).toEqual([2, 4, 6]);
});

test('buscarPorId encuentra y también devuelve undefined', () => {
  expect(buscarPorId(productos, 3)?.nombre).toBe('Audífonos inalámbricos');
  expect(buscarPorId(productos, 99)).toBeUndefined();
});

test('nombresDeCategoria filtra y ordena', () => {
  expect(nombresDeCategoria(productos, 'hogar')).toEqual(['Lámpara de escritorio', 'Taza térmica']);
  expect(nombresDeCategoria(productos, 'juguetes')).toEqual([]);
});

test('crearUsuario arma el correo y usa rol por defecto', () => {
  expect(crearUsuario('Ana')).toEqual({ nombre: 'Ana', correo: 'ana@ejemplo.com', rol: 'qa' });
  expect(crearUsuario('Luis', 'admin').rol).toBe('admin');
});
