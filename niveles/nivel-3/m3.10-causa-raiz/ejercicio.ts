// M3.10 Análisis de causa raíz: primero clasifica, luego investiga.
// Cuando el CI amanece con 40 fallas, agruparlas por tipo te dice por dónde empezar.
// Corre las pruebas con:  npx playwright test m3.10

export type TipoDeFalla = 'localizador' | 'tiempo' | 'aserción' | 'red' | 'servidor' | 'desconocido';

/**
 * 1. Clasifica el mensaje de error de una prueba de Playwright. Revisa en este orden
 *    (el primero que coincida gana, sin importar mayúsculas):
 *    - "red":         net::ERR_   o   ECONNREFUSED
 *    - "servidor":    un status 5xx en el texto, por ejemplo "Received: 500" o "status 503"
 *    - "localizador": "strict mode violation"  o  "resolved to 0 elements"  o  "element(s) not found"
 *    - "tiempo":      "Timeout"  seguido en algún punto de "exceeded"
 *    - "aserción":    "expect(" en el mensaje
 *    - si nada coincide: "desconocido"
 */
export function clasificarFalla(mensaje: string): TipoDeFalla {
  // TODO
  return 'desconocido';
}

/**
 * 2. Agrupa fallas y devuelve los tipos ordenados por cantidad (mayor primero).
 *    Empates: orden alfabético del tipo.
 *    agruparFallas(['net::ERR_FAILED', 'Timeout 5000ms exceeded', 'net::ERR_ABORTED'])
 *      → [{ tipo: 'red', cantidad: 2 }, { tipo: 'tiempo', cantidad: 1 }]
 */
export function agruparFallas(mensajes: string[]): { tipo: TipoDeFalla; cantidad: number }[] {
  // TODO
  return [];
}
