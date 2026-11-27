import { test, expect } from '@playwright/test';
import * as e from './ejercicio';

test('usuarioDePrueba es "estandar"', () => {
  expect(e.usuarioDePrueba).toBe('estandar');
});

test('puerto es 3000', () => {
  expect(e.puerto).toBe(3000);
});

test('modoHeadless es verdadero', () => {
  expect(e.modoHeadless).toBe(true);
});

test('urlBase usa el puerto', () => {
  expect(e.urlBase).toBe('http://localhost:3000');
});

test('esperaEnMs es 30 segundos en milisegundos', () => {
  expect(e.esperaEnMs).toBe(30_000);
});

test('mensaje combina usuario y URL', () => {
  expect(e.mensaje).toBe('Probando como estandar en http://localhost:3000');
});
