export interface CasoDePrueba {
  titlePath(): string[];
  outcome(): 'expected' | 'unexpected' | 'flaky' | 'skipped';
}

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
  tasaDeExito: number;
  masLentas: string[];
}

export class ReporterMetricas {
  private readonly duraciones = new Map<CasoDePrueba, number>();

  onTestEnd(caso: CasoDePrueba, resultado: ResultadoDePrueba): void {
    this.duraciones.set(caso, (this.duraciones.get(caso) ?? 0) + resultado.duration);
  }

  resumen(): Resumen {
    const casos = [...this.duraciones.keys()];
    const contar = (o: ReturnType<CasoDePrueba['outcome']>) => casos.filter((c) => c.outcome() === o).length;
    const pasaron = contar('expected');
    const inestables = contar('flaky');
    const total = casos.length;
    const masLentas = [...this.duraciones.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([caso]) => caso.titlePath().filter(Boolean).join(' › '));
    return {
      total,
      pasaron,
      fallaron: contar('unexpected'),
      inestables,
      omitidas: contar('skipped'),
      tasaDeExito: total === 0 ? 0 : Math.round(((pasaron + inestables) / total) * 1000) / 10,
      masLentas,
    };
  }
}
