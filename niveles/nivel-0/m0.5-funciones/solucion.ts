export function esCorreoValido(correo: string): boolean {
  const partes = correo.split('@');
  if (partes.length !== 2) return false;
  const [usuario, dominio] = partes;
  return usuario.length > 0 && dominio.includes('.') && !dominio.startsWith('.') && !dominio.endsWith('.');
}

export function formatearPrecio(cantidad: number): string {
  return `$${cantidad.toLocaleString('en-US')} MXN`;
}

export function calcularTotal(precios: number[], descuento: number = 0): number {
  let suma = 0;
  for (const precio of precios) suma += precio;
  return suma - (suma * descuento) / 100;
}

export const nombrePrueba = (modulo: string, caso: string): string => {
  return `[${modulo}] ${caso}`;
};

export function correosInvalidos(correos: string[]): string[] {
  const invalidos: string[] = [];
  for (const correo of correos) {
    if (!esCorreoValido(correo)) invalidos.push(correo);
  }
  return invalidos;
}
