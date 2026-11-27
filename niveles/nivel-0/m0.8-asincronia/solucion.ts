export function consultarUsuario(id: number): Promise<{ id: number; nombre: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) resolve({ id: 1, nombre: 'Ana López' });
      else reject(new Error('Usuario no encontrado'));
    }, 200);
  });
}

export async function saludarUsuario(id: number): Promise<string> {
  const usuario = await consultarUsuario(id);
  return `Hola, ${usuario.nombre}`;
}

export async function consultarDosVeces(): Promise<string[]> {
  const primero = await consultarUsuario(1);
  const segundo = await consultarUsuario(1);
  return [primero.nombre, segundo.nombre];
}

export async function nombreONada(id: number): Promise<string> {
  try {
    const usuario = await consultarUsuario(id);
    return usuario.nombre;
  } catch {
    return 'Sin usuario';
  }
}

export async function esperarHasta(condicion: () => boolean, limiteMs: number): Promise<boolean> {
  const inicio = Date.now();
  while (Date.now() - inicio < limiteMs) {
    if (condicion()) return true;
    await new Promise((r) => setTimeout(r, 50));
  }
  return condicion();
}
