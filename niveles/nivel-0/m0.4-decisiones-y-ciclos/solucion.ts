export function clasificarEstado(codigo: number): string {
  if (codigo >= 200 && codigo <= 299) return 'exito';
  if (codigo >= 300 && codigo <= 399) return 'redireccion';
  if (codigo >= 400 && codigo <= 499) return 'error-cliente';
  if (codigo >= 500 && codigo <= 599) return 'error-servidor';
  return 'desconocido';
}

export function esEdadValida(edad: number): boolean {
  return edad >= 18 && edad <= 99;
}

export function contarAprobadas(resultados: string[]): number {
  let aprobadas = 0;
  for (const resultado of resultados) {
    if (resultado === 'paso') aprobadas++;
  }
  return aprobadas;
}

export function nombreNavegador(proyecto: string): string {
  switch (proyecto) {
    case 'chromium':
      return 'Chrome';
    case 'firefox':
      return 'Firefox';
    case 'webkit':
      return 'Safari';
    default:
      return 'No soportado';
  }
}

export function generarCasos(cantidad: number): string[] {
  const casos: string[] = [];
  for (let i = 1; i <= cantidad; i++) {
    casos.push(`Caso ${i}`);
  }
  return casos;
}
