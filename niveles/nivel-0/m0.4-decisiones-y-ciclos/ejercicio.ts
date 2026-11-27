// M0.4 Decisiones y ciclos
// Completa el cuerpo de cada función. No cambies los nombres ni los parámetros.
// Corre las pruebas con:  npx playwright test m0.4

/**
 * 1. Clasifica un código de estado HTTP.
 *    200–299 → "exito", 300–399 → "redireccion", 400–499 → "error-cliente",
 *    500–599 → "error-servidor", cualquier otro → "desconocido".
 */
export function clasificarEstado(codigo: number): string {
  // TODO
  return '';
}

/**
 * 2. Valida la edad de un formulario de registro (valores límite).
 *    Es válida si está entre 18 y 99, incluyendo ambos.
 */
export function esEdadValida(edad: number): boolean {
  // TODO
  return false;
}

/**
 * 3. Cuenta cuántas pruebas pasaron en una lista de resultados.
 *    Ejemplo: ["paso", "fallo", "paso"] → 2
 *    Usa un ciclo for...of.
 */
export function contarAprobadas(resultados: string[]): number {
  // TODO
  return -1;
}

/**
 * 4. Devuelve el nombre del navegador para un proyecto de Playwright usando switch.
 *    "chromium" → "Chrome", "firefox" → "Firefox", "webkit" → "Safari",
 *    cualquier otro → "No soportado".
 */
export function nombreNavegador(proyecto: string): string {
  // TODO
  return '';
}

/**
 * 5. Genera los nombres de N casos de prueba usando un ciclo for clásico.
 *    generarCasos(3) → ["Caso 1", "Caso 2", "Caso 3"]
 */
export function generarCasos(cantidad: number): string[] {
  const casos: string[] = [];
  // TODO
  return casos;
}
