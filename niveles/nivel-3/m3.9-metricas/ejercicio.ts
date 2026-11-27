// M3.9 Métricas de calidad con un reporter propio.
// Playwright llama a un reporter en cada evento de la corrida (onBegin, onTestEnd, onEnd...).
// Aquí construyes la parte que calcula métricas. Las pruebas le pasan objetos falsos con la
// misma forma que los reales, así que no necesitas correr Playwright para probarlo.
// Corre las pruebas con:  npx playwright test m3.9
//
// Para usarlo de verdad (ver la guía): crea reporter-metricas.ts con
//   export default class implements Reporter { ... } y agrégalo en playwright.config.ts:
//   reporter: [['list'], ['./reporter-metricas.ts']]

/** Lo que usamos de TestCase (@playwright/test/reporter). */
export interface CasoDePrueba {
  titlePath(): string[];
  outcome(): 'expected' | 'unexpected' | 'flaky' | 'skipped';
}

/** Lo que usamos de TestResult (@playwright/test/reporter). */
export interface ResultadoDePrueba {
  duration: number;
  status: 'passed' | 'failed' | 'timedOut' | 'skipped' | 'interrupted';
  retry: number;
}

export interface Resumen {
  total: number;
  pasaron: number;
  fallaron: number;
  inestables: number;
  omitidas: number;
  /** Porcentaje de pruebas que pasaron (incluye las inestables), con 1 decimal. Sin pruebas → 0. */
  tasaDeExito: number;
  /** Nombres (titlePath sin vacíos, unidos con " › ") de las 3 pruebas más lentas, de la más lenta a la menos. */
  masLentas: string[];
}

export class ReporterMetricas {
  /**
   * 1. Playwright llama a onTestEnd una vez por INTENTO. Si una prueba falla y pasa en el reintento,
   *    llega dos veces. Guarda solo el último intento de cada prueba (usa el caso como llave)
   *    y suma la duración de todos sus intentos.
   */
  onTestEnd(caso: CasoDePrueba, resultado: ResultadoDePrueba): void {
    // TODO
  }

  /**
   * 2. Clasifica cada prueba con caso.outcome():
   *    expected → pasaron, flaky → inestables, unexpected → fallaron, skipped → omitidas.
   */
  resumen(): Resumen {
    // TODO
    return { total: 0, pasaron: 0, fallaron: 0, inestables: 0, omitidas: 0, tasaDeExito: -1, masLentas: [] };
  }
}
