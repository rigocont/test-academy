import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';
import { agruparPorCategoria, categoriasUnicas, diferenciasDePrecio, idsDuplicados, leerCsv } from './ejercicio';

const CSV = readFileSync(join(import.meta.dirname, '..', 'framework', 'datos', 'productos.csv'), 'utf-8');

test('leerCsv convierte el archivo de productos', () => {
  const productos = leerCsv(CSV);
  expect(productos).toHaveLength(6);
  expect(productos[3]).toEqual({ id: 4, nombre: 'Taza térmica', precio: 249, categoria: 'hogar' });
});

test('leerCsv ignora líneas vacías y espacios', () => {
  const texto = 'id, nombre ,precio,categoria\n\n 7 , Pluma , 15 , papeleria \n\n';
  expect(leerCsv(texto)).toEqual([{ id: 7, nombre: 'Pluma', precio: 15, categoria: 'papeleria' }]);
});

test('agruparPorCategoria usa un Map', () => {
  const grupos = agruparPorCategoria(leerCsv(CSV));
  expect(grupos).toBeInstanceOf(Map);
  expect(grupos.get('hogar')?.map((p) => p.nombre)).toEqual(['Lámpara de escritorio', 'Taza térmica']);
  expect(grupos.size).toBe(4);
});

test('categoriasUnicas no repite', () => {
  expect(categoriasUnicas(leerCsv(CSV))).toEqual(['accesorios', 'hogar', 'electronica', 'papeleria']);
});

test('idsDuplicados encuentra repetidos', () => {
  expect(idsDuplicados([3, 1, 3, 2, 1, 3])).toEqual([1, 3]);
  expect(idsDuplicados([1, 2, 3])).toEqual([]);
});

test('diferenciasDePrecio compara esperado contra recibido', () => {
  const esperados = leerCsv(CSV);
  const recibidos = esperados.filter((p) => p.id !== 1).map((p) => (p.id === 4 ? { ...p, precio: 259 } : p));
  expect(diferenciasDePrecio(esperados, recibidos)).toEqual([
    'Mochila de viaje: no encontrado',
    'Taza térmica: esperado 249, recibido 259',
  ]);
});
