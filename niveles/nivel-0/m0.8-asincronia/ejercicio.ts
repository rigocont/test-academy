// M0.8 Asincronía (introducción)
// El navegador y las APIs tardan en responder. En Playwright casi todo devuelve
// una promesa, y si olvidas `await` la prueba sigue sin esperar el resultado.
// Corre las pruebas con:  npx playwright test m0.8

/** Simula una API lenta. Ya está hecha, no la cambies. */
export function consultarUsuario(id: number): Promise<{ id: number; nombre: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) resolve({ id: 1, nombre: 'Ana López' });
      else reject(new Error('Usuario no encontrado'));
    }, 200);
  });
}

/**
 * 1. ERROR A CORREGIR: a esta función le falta algo y devuelve
 *    "Hola, undefined". Arréglala para que devuelva "Hola, Ana López".
 */
export async function saludarUsuario(id: number): Promise<string> {
  const usuario: any = consultarUsuario(id); // ← aquí hay un error
  return `Hola, ${usuario.nombre}`;
}

/**
 * 2. Consulta dos veces el usuario 1, una después de la otra,
 *    y devuelve los dos nombres en un arreglo.
 */
export async function consultarDosVeces(): Promise<string[]> {
  // TODO
  return [];
}

/**
 * 3. Si el usuario no existe, consultarUsuario lanza un error.
 *    Usa try/catch para devolver "Sin usuario" en ese caso, o el nombre si existe.
 */
export async function nombreONada(id: number): Promise<string> {
  // TODO
  return '';
}

/**
 * 4. Espera hasta que `condicion()` sea verdadera, revisando cada 50 ms,
 *    con un máximo de `limiteMs`. Devuelve true si se cumplió y false si se acabó el tiempo.
 *    Así funciona por dentro el auto-waiting de Playwright.
 *    Tip: await new Promise((r) => setTimeout(r, 50)) espera 50 ms.
 */
export async function esperarHasta(condicion: () => boolean, limiteMs: number): Promise<boolean> {
  // TODO
  return false;
}
