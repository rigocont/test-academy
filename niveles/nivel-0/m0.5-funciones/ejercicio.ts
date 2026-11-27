// M0.5 Funciones
// Lee primero las pruebas en ejercicio.spec.ts: te dicen qué se espera de cada función.
// Corre las pruebas con:  npx playwright test m0.5

/**
 * 1. Válido si tiene exactamente una "@", algo antes de ella,
 *    y un "." en el dominio que no esté al inicio ni al final.
 *    Tip: correo.split('@') devuelve un arreglo con las partes.
 */
export function esCorreoValido(correo: string): boolean {
  // TODO
  return false;
}

/**
 * 2. 1299 → "$1,299 MXN"
 *    Tip: cantidad.toLocaleString('en-US') agrega las comas.
 */
export function formatearPrecio(cantidad: number): string {
  // TODO
  return '';
}

/**
 * 3. Suma los precios y aplica un descuento en porcentaje.
 *    El descuento es opcional: si no se manda, vale 0 (parámetro por defecto).
 *    calcularTotal([100, 200], 10) → 270
 */
export function calcularTotal(precios: number[], descuento: number = 0): number {
  // TODO
  return -1;
}

/**
 * 4. Arrow function.
 *    nombrePrueba("login", "usuario bloqueado") → "[login] usuario bloqueado"
 */
export const nombrePrueba = (modulo: string, caso: string): string => {
  // TODO
  return '';
};

/**
 * 5. Reto: una función que usa otras funciones.
 *    Recibe una lista de correos y devuelve solo los inválidos.
 *    Usa esCorreoValido dentro de un ciclo.
 */
export function correosInvalidos(correos: string[]): string[] {
  // TODO
  return [];
}
