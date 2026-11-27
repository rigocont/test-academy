import { test, expect } from '@playwright/test';
import { esCorreoValido, formatearPrecio, calcularTotal, nombrePrueba, correosInvalidos } from './ejercicio';

test.describe('esCorreoValido', () => {
  test('acepta ana@ejemplo.com', () => expect(esCorreoValido('ana@ejemplo.com')).toBe(true));
  test('rechaza sin @', () => expect(esCorreoValido('anaejemplo.com')).toBe(false));
  test('rechaza dos @', () => expect(esCorreoValido('ana@@ejemplo.com')).toBe(false));
  test('rechaza sin punto en el dominio', () => expect(esCorreoValido('ana@ejemplo')).toBe(false));
  test('rechaza dominio que termina en punto', () => expect(esCorreoValido('ana@ejemplo.')).toBe(false));
  test('rechaza sin usuario', () => expect(esCorreoValido('@ejemplo.com')).toBe(false));
});

test('formatearPrecio agrega signo, comas y moneda', () => {
  expect(formatearPrecio(1299)).toBe('$1,299 MXN');
  expect(formatearPrecio(99)).toBe('$99 MXN');
});

test('calcularTotal suma y aplica descuento opcional', () => {
  expect(calcularTotal([100, 200])).toBe(300);
  expect(calcularTotal([100, 200], 10)).toBe(270);
  expect(calcularTotal([])).toBe(0);
});

test('nombrePrueba arma el nombre con el módulo', () => {
  expect(nombrePrueba('login', 'usuario bloqueado')).toBe('[login] usuario bloqueado');
});

test('correosInvalidos devuelve solo los que no pasan', () => {
  expect(correosInvalidos(['ana@ejemplo.com', 'sin-arroba', 'luis@ejemplo'])).toEqual(['sin-arroba', 'luis@ejemplo']);
});
