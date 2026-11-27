// M3.2 Configuración y ambientes
// Un framework corre en varios ambientes. La configuración de cada uno vive en un solo lugar
// y se elige con una variable de ambiente:  AMBIENTE=qa npx playwright test
// Corre las pruebas con:  npx playwright test m3.2

export type NombreAmbiente = 'local' | 'dev' | 'qa' | 'staging';

export interface Ambiente {
  nombre: NombreAmbiente;
  baseURL: string;
  /** Reintentos en CI. En local siempre 0 para ver las fallas de inmediato. */
  reintentos: number;
  /** ¿Se permiten pruebas que crean o borran datos? En staging no. */
  permiteEscritura: boolean;
}

export const AMBIENTES: Record<NombreAmbiente, Omit<Ambiente, 'nombre'>> = {
  local: { baseURL: 'http://localhost:3000', reintentos: 0, permiteEscritura: true },
  dev: { baseURL: 'https://dev.tienda-qa.ejemplo', reintentos: 1, permiteEscritura: true },
  qa: { baseURL: 'https://qa.tienda-qa.ejemplo', reintentos: 2, permiteEscritura: true },
  staging: { baseURL: 'https://staging.tienda-qa.ejemplo', reintentos: 2, permiteEscritura: false },
};

/**
 * 1. Devuelve la configuración del ambiente pedido.
 *    - Sin valor (undefined o '') → "local".
 *    - Acepta mayúsculas y espacios: " QA " → "qa".
 *    - Un nombre desconocido lanza Error('Ambiente desconocido: "<valor>". Usa: local, dev, qa, staging')
 *    - `variables` permite sobrescribir: BASE_URL cambia baseURL; en local, CI=true hace reintentos 1.
 */
export function cargarAmbiente(valor: string | undefined, variables: Record<string, string | undefined> = {}): Ambiente {
  // TODO
  return { nombre: 'local', baseURL: '', reintentos: -1, permiteEscritura: true };
}

/**
 * 2. Nunca imprimas secretos en los logs del CI.
 *    Oculta los valores de las llaves que contienen TOKEN, PASSWORD, CONTRASENA o SECRET
 *    (sin importar mayúsculas), dejando solo los últimos 4 caracteres: "****ab12".
 *    Si el valor tiene 4 caracteres o menos, devuelve "****".
 */
export function ocultarSecretos(variables: Record<string, string>): Record<string, string> {
  // TODO
  return {};
}
