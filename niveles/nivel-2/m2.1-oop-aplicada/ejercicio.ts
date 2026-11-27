// M2.1 OOP aplicada a pruebas
// Vas a construir un pequeño generador de reportes de resultados de pruebas.
// Practicas: clases abstractas, herencia, sobrescritura de métodos, composición y encapsulamiento.
// Corre las pruebas con:  npx playwright test m2.1

export type Estado = 'paso' | 'fallo' | 'omitida';

export interface Resultado {
  nombre: string;
  estado: Estado;
  duracionMs: number;
}

/**
 * 1. Clase base abstracta. Ya tiene resumen() completo.
 *    Las clases hijas DEBEN implementar formatear().
 */
export abstract class Reporte {
  constructor(protected readonly titulo: string) {}

  abstract formatear(resultados: Resultado[]): string;

  /** Cuenta por estado. Ya está completo. */
  resumen(resultados: Resultado[]): Record<Estado, number> {
    const conteo: Record<Estado, number> = { paso: 0, fallo: 0, omitida: 0 };
    for (const r of resultados) conteo[r.estado]++;
    return conteo;
  }
}

/**
 * 2. Reporte de texto. formatear() devuelve:
 *      "<titulo>: 2 pasaron, 1 fallaron, 0 omitidas"
 */
export class ReporteTexto extends Reporte {
  formatear(resultados: Resultado[]): string {
    // TODO: usa this.resumen() y this.titulo
    return '';
  }
}

/**
 * 3. Reporte JSON. formatear() devuelve un JSON con esta forma:
 *      { "titulo": "...", "resumen": { "paso": 2, "fallo": 1, "omitida": 0 }, "fallidas": ["nombre de la prueba"] }
 */
export class ReporteJson extends Reporte {
  formatear(resultados: Resultado[]): string {
    // TODO
    return '';
  }
}

/**
 * 4. Sobrescritura: un reporte de texto que además lista las pruebas lentas (más de `limiteMs`).
 *    Usa super.formatear() y agrega al final: " | lentas: nombre1, nombre2"
 *    Si no hay lentas, devuelve lo mismo que ReporteTexto.
 */
export class ReporteTextoConLentas extends ReporteTexto {
  constructor(
    titulo: string,
    private readonly limiteMs: number,
  ) {
    super(titulo);
  }

  override formatear(resultados: Resultado[]): string {
    // TODO
    return '';
  }
}

/**
 * 5. Composición: la ejecución NO es un reporte, TIENE un reporte.
 *    Guarda resultados con registrar() y genera el reporte con el formato que le pasaron.
 *    resultados() devuelve una COPIA para que nadie modifique la lista desde fuera.
 */
export class Ejecucion {
  private lista: Resultado[] = [];

  constructor(private readonly reporte: Reporte) {}

  registrar(resultado: Resultado): void {
    // TODO
  }

  resultados(): Resultado[] {
    // TODO
    return [];
  }

  generarReporte(): string {
    // TODO
    return '';
  }

  /** true si ninguna prueba falló. */
  exitosa(): boolean {
    // TODO
    return false;
  }
}
