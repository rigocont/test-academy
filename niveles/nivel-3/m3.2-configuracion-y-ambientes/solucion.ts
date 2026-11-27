export type NombreAmbiente = 'local' | 'dev' | 'qa' | 'staging';

export interface Ambiente {
  nombre: NombreAmbiente;
  baseURL: string;
  reintentos: number;
  permiteEscritura: boolean;
}

export const AMBIENTES: Record<NombreAmbiente, Omit<Ambiente, 'nombre'>> = {
  local: { baseURL: 'http://localhost:3000', reintentos: 0, permiteEscritura: true },
  dev: { baseURL: 'https://dev.tienda-qa.ejemplo', reintentos: 1, permiteEscritura: true },
  qa: { baseURL: 'https://qa.tienda-qa.ejemplo', reintentos: 2, permiteEscritura: true },
  staging: { baseURL: 'https://staging.tienda-qa.ejemplo', reintentos: 2, permiteEscritura: false },
};

export function cargarAmbiente(valor: string | undefined, variables: Record<string, string | undefined> = {}): Ambiente {
  const nombre = (valor ?? '').trim().toLowerCase() || 'local';
  if (!(nombre in AMBIENTES)) {
    throw new Error(`Ambiente desconocido: "${valor}". Usa: ${Object.keys(AMBIENTES).join(', ')}`);
  }
  const base = AMBIENTES[nombre as NombreAmbiente];
  return {
    nombre: nombre as NombreAmbiente,
    ...base,
    baseURL: variables.BASE_URL || base.baseURL,
    reintentos: nombre === 'local' && variables.CI === 'true' ? 1 : base.reintentos,
  };
}

export function ocultarSecretos(variables: Record<string, string>): Record<string, string> {
  const sensible = /TOKEN|PASSWORD|CONTRASENA|SECRET/i;
  const resultado: Record<string, string> = {};
  for (const [llave, valor] of Object.entries(variables)) {
    if (!sensible.test(llave)) resultado[llave] = valor;
    else resultado[llave] = valor.length <= 4 ? '****' : `****${valor.slice(-4)}`;
  }
  return resultado;
}
