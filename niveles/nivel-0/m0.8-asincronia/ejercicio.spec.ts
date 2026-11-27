import { test, expect } from '@playwright/test';
import { saludarUsuario, consultarDosVeces, nombreONada, esperarHasta } from './ejercicio';

test('saludarUsuario espera a la API', async () => {
  expect(await saludarUsuario(1)).toBe('Hola, Ana López');
});

test('consultarDosVeces devuelve dos nombres', async () => {
  expect(await consultarDosVeces()).toEqual(['Ana López', 'Ana López']);
});

test('nombreONada maneja el error', async () => {
  expect(await nombreONada(1)).toBe('Ana López');
  expect(await nombreONada(99)).toBe('Sin usuario');
});

test('esperarHasta devuelve true cuando la condición se cumple a tiempo', async () => {
  const listoEn = Date.now() + 300;
  expect(await esperarHasta(() => Date.now() >= listoEn, 1000)).toBe(true);
});

test('esperarHasta devuelve false cuando se acaba el tiempo', async () => {
  const inicio = Date.now();
  expect(await esperarHasta(() => false, 300)).toBe(false);
  expect(Date.now() - inicio).toBeGreaterThanOrEqual(250);
});
