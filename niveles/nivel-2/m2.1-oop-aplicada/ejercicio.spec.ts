import { test, expect } from '@playwright/test';
import { Ejecucion, Reporte, ReporteJson, ReporteTexto, ReporteTextoConLentas, type Resultado } from './ejercicio';

const resultados: Resultado[] = [
  { nombre: 'login exitoso', estado: 'paso', duracionMs: 800 },
  { nombre: 'checkout', estado: 'fallo', duracionMs: 4200 },
  { nombre: 'búsqueda', estado: 'paso', duracionMs: 3100 },
  { nombre: 'reporte de ventas', estado: 'omitida', duracionMs: 0 },
];

test('ReporteTexto resume los resultados', () => {
  expect(new ReporteTexto('Humo').formatear(resultados)).toBe('Humo: 2 pasaron, 1 fallaron, 1 omitidas');
});

test('ReporteJson incluye resumen y fallidas', () => {
  const json = JSON.parse(new ReporteJson('Humo').formatear(resultados));
  expect(json).toEqual({ titulo: 'Humo', resumen: { paso: 2, fallo: 1, omitida: 1 }, fallidas: ['checkout'] });
});

test('ReporteTextoConLentas sobrescribe formatear y reutiliza el del padre', () => {
  const reporte = new ReporteTextoConLentas('Humo', 3000);
  expect(reporte.formatear(resultados)).toBe('Humo: 2 pasaron, 1 fallaron, 1 omitidas | lentas: checkout, búsqueda');
  expect(reporte.formatear(resultados.slice(0, 1))).toBe('Humo: 1 pasaron, 0 fallaron, 0 omitidas');
  expect(reporte).toBeInstanceOf(ReporteTexto);
  expect(reporte).toBeInstanceOf(Reporte);
});

test.describe('Ejecucion (composición)', () => {
  test('usa el formato que recibe', () => {
    const texto = new Ejecucion(new ReporteTexto('Regresión'));
    const json = new Ejecucion(new ReporteJson('Regresión'));
    for (const r of resultados) {
      texto.registrar(r);
      json.registrar(r);
    }
    expect(texto.generarReporte()).toContain('Regresión: 2 pasaron');
    expect(JSON.parse(json.generarReporte()).fallidas).toEqual(['checkout']);
  });

  test('exitosa es false si algo falló', () => {
    const ejecucion = new Ejecucion(new ReporteTexto('X'));
    ejecucion.registrar(resultados[0]);
    expect(ejecucion.exitosa()).toBe(true);
    ejecucion.registrar(resultados[1]);
    expect(ejecucion.exitosa()).toBe(false);
  });

  test('resultados() devuelve una copia', () => {
    const ejecucion = new Ejecucion(new ReporteTexto('X'));
    ejecucion.registrar(resultados[0]);
    const copia = ejecucion.resultados();
    copia.push(resultados[1]);
    copia[0].estado = 'fallo';
    expect(ejecucion.resultados()).toHaveLength(1);
    expect(ejecucion.exitosa()).toBe(true);
  });
});
