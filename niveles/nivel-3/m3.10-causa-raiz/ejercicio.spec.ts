import { test, expect } from '@playwright/test';
import { clasificarFalla, agruparFallas } from './ejercicio';

// Mensajes reales (recortados) de corridas de Playwright.
const MENSAJES = {
  red: 'page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/',
  red2: 'apiRequestContext.get: connect ECONNREFUSED 127.0.0.1:3000',
  servidor: 'expect(received).toBe(expected)\n\nExpected: 200\nReceived: 500',
  localizador: "locator.click: Error: strict mode violation: getByRole('button') resolved to 3 elements",
  localizador2: "expect(locator).toBeVisible() failed\n\nLocator: getByText('Hola')\nExpected: visible\nError: element(s) not found",
  tiempo: 'Test timeout of 30000ms exceeded.',
  asercion: 'expect(received).toEqual(expected)\n\n- Expected  - 1\n+ Received  + 1',
  otro: 'TypeError: Cannot read properties of undefined',
};

test('clasifica cada tipo', () => {
  expect(clasificarFalla(MENSAJES.red)).toBe('red');
  expect(clasificarFalla(MENSAJES.red2)).toBe('red');
  expect(clasificarFalla(MENSAJES.servidor)).toBe('servidor');
  expect(clasificarFalla(MENSAJES.localizador)).toBe('localizador');
  expect(clasificarFalla(MENSAJES.tiempo)).toBe('tiempo');
  expect(clasificarFalla(MENSAJES.asercion)).toBe('aserción');
  expect(clasificarFalla(MENSAJES.otro)).toBe('desconocido');
});

test('respeta el orden de las reglas', () => {
  // Contiene "expect(" pero la causa es que el elemento no existe.
  expect(clasificarFalla(MENSAJES.localizador2)).toBe('localizador');
  // Un 404 no es falla del servidor.
  expect(clasificarFalla('expect(received).toBe(expected)\nReceived: 404')).toBe('aserción');
});

test('agrupa y ordena por cantidad', () => {
  expect(agruparFallas([MENSAJES.tiempo, MENSAJES.red, MENSAJES.asercion, MENSAJES.red2])).toEqual([
    { tipo: 'red', cantidad: 2 },
    { tipo: 'aserción', cantidad: 1 },
    { tipo: 'tiempo', cantidad: 1 },
  ]);
  expect(agruparFallas([])).toEqual([]);
});
