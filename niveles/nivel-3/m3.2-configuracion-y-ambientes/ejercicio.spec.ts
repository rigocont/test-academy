import { test, expect } from '@playwright/test';
import { cargarAmbiente, ocultarSecretos } from './ejercicio';

test.describe('cargarAmbiente', () => {
  test('sin valor usa local', () => {
    expect(cargarAmbiente(undefined)).toEqual({ nombre: 'local', baseURL: 'http://localhost:3000', reintentos: 0, permiteEscritura: true });
    expect(cargarAmbiente('').nombre).toBe('local');
  });

  test('normaliza el nombre', () => {
    expect(cargarAmbiente(' QA ').nombre).toBe('qa');
  });

  test('staging no permite escritura', () => {
    expect(cargarAmbiente('staging').permiteEscritura).toBe(false);
  });

  test('un nombre desconocido falla con un mensaje útil', () => {
    expect(() => cargarAmbiente('prod')).toThrow('Ambiente desconocido: "prod". Usa: local, dev, qa, staging');
  });

  test('BASE_URL sobrescribe la URL', () => {
    expect(cargarAmbiente('qa', { BASE_URL: 'http://localhost:4000' }).baseURL).toBe('http://localhost:4000');
  });

  test('en CI, local reintenta una vez', () => {
    expect(cargarAmbiente('local', { CI: 'true' }).reintentos).toBe(1);
    expect(cargarAmbiente('qa', { CI: 'true' }).reintentos).toBe(2);
  });
});

test('ocultarSecretos deja solo los últimos 4 caracteres', () => {
  expect(
    ocultarSecretos({ AMBIENTE: 'qa', API_TOKEN: 'tk-1234abcd', db_password: 'abc', ClientSecret: 'zzzz9999' }),
  ).toEqual({ AMBIENTE: 'qa', API_TOKEN: '****abcd', db_password: '****', ClientSecret: '****9999' });
});
