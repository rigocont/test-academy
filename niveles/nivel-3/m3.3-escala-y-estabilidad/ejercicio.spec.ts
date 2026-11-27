import { test, expect } from '@playwright/test';
import { repartirEnShards, clasificarPrueba, tasaDeInestabilidad } from './ejercicio';

test.describe('repartirEnShards', () => {
  test('equilibra la duración entre grupos', () => {
    const pruebas = [
      { nombre: 'a', duracionMs: 50 },
      { nombre: 'b', duracionMs: 40 },
      { nombre: 'c', duracionMs: 30 },
      { nombre: 'd', duracionMs: 20 },
      { nombre: 'e', duracionMs: 10 },
    ];
    expect(repartirEnShards(pruebas, 2)).toEqual([
      ['a', 'd', 'e'],
      ['b', 'c'],
    ]);
  });

  test('con más shards que pruebas deja grupos vacíos', () => {
    expect(repartirEnShards([{ nombre: 'a', duracionMs: 5 }], 3)).toEqual([['a'], [], []]);
  });

  test('no acepta 0 shards', () => {
    expect(() => repartirEnShards([], 0)).toThrow('Se necesita al menos 1 shard');
  });

  test('no modifica el arreglo original', () => {
    const pruebas = [
      { nombre: 'rapida', duracionMs: 1 },
      { nombre: 'lenta', duracionMs: 9 },
    ];
    expect(repartirEnShards(pruebas, 1)).toEqual([['lenta', 'rapida']]);
    expect(pruebas[0].nombre).toBe('rapida');
  });
});

test('clasificarPrueba', () => {
  expect(clasificarPrueba([])).toBe('sin datos');
  expect(clasificarPrueba([true, true])).toBe('estable');
  expect(clasificarPrueba([false, false])).toBe('rota');
  expect(clasificarPrueba([true, false, true])).toBe('inestable');
});

test('tasaDeInestabilidad', () => {
  expect(tasaDeInestabilidad({ a: [true], b: [true, false], c: [] })).toBe(50);
  expect(tasaDeInestabilidad({ a: [true], b: [false], c: [true, false] })).toBe(33.3);
  expect(tasaDeInestabilidad({})).toBe(0);
});
