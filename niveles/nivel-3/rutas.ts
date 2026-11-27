import { join } from 'node:path';

/** Archivo donde el setup de M3.2 guarda la sesión del usuario "estandar". */
export const ESTADO_ESTANDAR = join(import.meta.dirname, '..', '..', 'playwright', '.auth', 'estandar.json');
