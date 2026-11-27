import { test, expect } from '@playwright/test';
import { clasificarEstado, esEdadValida, contarAprobadas, nombreNavegador, generarCasos } from './ejercicio';

test.describe('clasificarEstado', () => {
  const casos: [number, string][] = [
    [200, 'exito'],
    [204, 'exito'],
    [301, 'redireccion'],
    [404, 'error-cliente'],
    [500, 'error-servidor'],
    [100, 'desconocido'],
  ];
  for (const [codigo, esperado] of casos) {
    test(`${codigo} es ${esperado}`, () => {
      expect(clasificarEstado(codigo)).toBe(esperado);
    });
  }
});

test.describe('esEdadValida (valores límite)', () => {
  test('17 no es válida', () => expect(esEdadValida(17)).toBe(false));
  test('18 es válida', () => expect(esEdadValida(18)).toBe(true));
  test('99 es válida', () => expect(esEdadValida(99)).toBe(true));
  test('100 no es válida', () => expect(esEdadValida(100)).toBe(false));
});

test('contarAprobadas cuenta solo "paso"', () => {
  expect(contarAprobadas(['paso', 'fallo', 'paso', 'omitida'])).toBe(2);
  expect(contarAprobadas([])).toBe(0);
});

test('nombreNavegador traduce los proyectos', () => {
  expect(nombreNavegador('chromium')).toBe('Chrome');
  expect(nombreNavegador('firefox')).toBe('Firefox');
  expect(nombreNavegador('webkit')).toBe('Safari');
  expect(nombreNavegador('ie')).toBe('No soportado');
});

test('generarCasos crea N nombres', () => {
  expect(generarCasos(3)).toEqual(['Caso 1', 'Caso 2', 'Caso 3']);
  expect(generarCasos(0)).toEqual([]);
});
