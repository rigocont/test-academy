import { test, expect } from '@playwright/test';
import { ReporterMetricas, type CasoDePrueba, type ResultadoDePrueba } from './ejercicio';

function caso(titulo: string, resultado: ReturnType<CasoDePrueba['outcome']>): CasoDePrueba {
  return { titlePath: () => ['', 'nivel-3', 'tienda.spec.ts', titulo], outcome: () => resultado };
}
const intento = (duration: number, status: ResultadoDePrueba['status'], retry = 0): ResultadoDePrueba => ({
  duration,
  status,
  retry,
});

test('sin pruebas el resumen está en ceros', () => {
  expect(new ReporterMetricas().resumen()).toEqual({
    total: 0, pasaron: 0, fallaron: 0, inestables: 0, omitidas: 0, tasaDeExito: 0, masLentas: [],
  });
});

test('cuenta cada prueba una sola vez aunque tenga reintentos', () => {
  const reporter = new ReporterMetricas();
  const inestable = caso('pago', 'flaky');
  reporter.onTestEnd(inestable, intento(100, 'failed'));
  reporter.onTestEnd(inestable, intento(120, 'passed', 1));
  reporter.onTestEnd(caso('login', 'expected'), intento(50, 'passed'));

  const resumen = reporter.resumen();
  expect(resumen.total).toBe(2);
  expect(resumen.inestables).toBe(1);
  expect(resumen.pasaron).toBe(1);
});

test('calcula la tasa de éxito y clasifica', () => {
  const reporter = new ReporterMetricas();
  reporter.onTestEnd(caso('a', 'expected'), intento(10, 'passed'));
  reporter.onTestEnd(caso('b', 'unexpected'), intento(10, 'failed'));
  reporter.onTestEnd(caso('c', 'skipped'), intento(0, 'skipped'));
  const resumen = reporter.resumen();
  expect(resumen).toMatchObject({ pasaron: 1, fallaron: 1, omitidas: 1, tasaDeExito: 33.3 });
});

test('lista las 3 más lentas sumando sus intentos', () => {
  const reporter = new ReporterMetricas();
  const reintentada = caso('checkout', 'flaky');
  reporter.onTestEnd(caso('rápida', 'expected'), intento(5, 'passed'));
  reporter.onTestEnd(caso('lenta', 'expected'), intento(900, 'passed'));
  reporter.onTestEnd(reintentada, intento(600, 'failed'));
  reporter.onTestEnd(reintentada, intento(600, 'passed', 1));
  reporter.onTestEnd(caso('media', 'expected'), intento(300, 'passed'));
  expect(reporter.resumen().masLentas).toEqual([
    'nivel-3 › tienda.spec.ts › checkout',
    'nivel-3 › tienda.spec.ts › lenta',
    'nivel-3 › tienda.spec.ts › media',
  ]);
});
