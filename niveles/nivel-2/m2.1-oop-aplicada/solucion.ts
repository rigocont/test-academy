export type Estado = 'paso' | 'fallo' | 'omitida';

export interface Resultado {
  nombre: string;
  estado: Estado;
  duracionMs: number;
}

export abstract class Reporte {
  constructor(protected readonly titulo: string) {}

  abstract formatear(resultados: Resultado[]): string;

  resumen(resultados: Resultado[]): Record<Estado, number> {
    const conteo: Record<Estado, number> = { paso: 0, fallo: 0, omitida: 0 };
    for (const r of resultados) conteo[r.estado]++;
    return conteo;
  }
}

export class ReporteTexto extends Reporte {
  formatear(resultados: Resultado[]): string {
    const r = this.resumen(resultados);
    return `${this.titulo}: ${r.paso} pasaron, ${r.fallo} fallaron, ${r.omitida} omitidas`;
  }
}

export class ReporteJson extends Reporte {
  formatear(resultados: Resultado[]): string {
    return JSON.stringify({
      titulo: this.titulo,
      resumen: this.resumen(resultados),
      fallidas: resultados.filter((r) => r.estado === 'fallo').map((r) => r.nombre),
    });
  }
}

export class ReporteTextoConLentas extends ReporteTexto {
  constructor(
    titulo: string,
    private readonly limiteMs: number,
  ) {
    super(titulo);
  }

  override formatear(resultados: Resultado[]): string {
    const base = super.formatear(resultados);
    const lentas = resultados.filter((r) => r.duracionMs > this.limiteMs).map((r) => r.nombre);
    return lentas.length ? `${base} | lentas: ${lentas.join(', ')}` : base;
  }
}

export class Ejecucion {
  private lista: Resultado[] = [];

  constructor(private readonly reporte: Reporte) {}

  registrar(resultado: Resultado): void {
    this.lista.push(resultado);
  }

  resultados(): Resultado[] {
    return this.lista.map((r) => ({ ...r }));
  }

  generarReporte(): string {
    return this.reporte.formatear(this.lista);
  }

  exitosa(): boolean {
    return this.lista.every((r) => r.estado !== 'fallo');
  }
}
