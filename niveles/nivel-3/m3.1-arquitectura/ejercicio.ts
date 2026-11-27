// M3.1 Arquitectura de un framework: patrones y OOP avanzada.
// Corre las pruebas con:  npx playwright test m3.1

export interface LineaPedido {
  id: number;
  cantidad: number;
}

export interface NuevoPedido {
  cliente: string;
  cp: string;
  productos: LineaPedido[];
}

/**
 * 1. Patrón Builder: arma datos de prueba legibles y con valores por defecto válidos.
 *
 *    const pedido = new ConstructorPedido().paraCliente('Ana').conProducto(4, 2).construir();
 *
 *    - Valores por defecto: cliente "Cliente QA", cp "06600", sin productos.
 *    - Cada método devuelve `this` para poder encadenar.
 *    - conProducto() acumula líneas; si el mismo id se agrega dos veces, suma la cantidad.
 *    - construir() lanza Error("El pedido necesita al menos un producto") si no hay productos,
 *      y devuelve una COPIA (construir dos veces da dos objetos independientes).
 */
export class ConstructorPedido {
  paraCliente(cliente: string): this {
    // TODO
    return this;
  }

  enCodigoPostal(cp: string): this {
    // TODO
    return this;
  }

  conProducto(id: number, cantidad = 1): this {
    // TODO
    return this;
  }

  construir(): NuevoPedido {
    // TODO
    return { cliente: '', cp: '', productos: [] };
  }
}

/**
 * 2. Genéricos: reintenta una función asíncrona hasta `intentos` veces.
 *    Si todas fallan, lanza el ÚLTIMO error. Devuelve el valor con su tipo original.
 *    Útil para preparar datos contra servicios inestables; NUNCA para esconder pruebas inestables.
 */
export async function reintentar<T>(fn: () => Promise<T>, intentos: number): Promise<T> {
  // TODO
  return fn();
}

/**
 * 3. Clase abstracta genérica: un repositorio en memoria para datos de prueba.
 *    T es el tipo de entidad; todas tienen `id`.
 *    Las subclases definen `validar()`. guardar() llama a validar() y lanza Error con el mensaje
 *    que devuelva si no es null.
 */
export abstract class Repositorio<T extends { id: number }> {
  protected elementos = new Map<number, T>();

  protected abstract validar(elemento: T): string | null;

  guardar(elemento: T): void {
    // TODO
  }

  obtener(id: number): T | undefined {
    // TODO
    return undefined;
  }

  todos(): T[] {
    // TODO
    return [];
  }
}

export interface Usuario {
  id: number;
  correo: string;
}

/** 4. Implementa validar(): el correo debe incluir "@", si no devuelve "Correo inválido: <correo>". */
export class RepositorioUsuarios extends Repositorio<Usuario> {
  protected validar(usuario: Usuario): string | null {
    // TODO
    return 'sin implementar';
  }
}
