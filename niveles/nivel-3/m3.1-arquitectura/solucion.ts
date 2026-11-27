export interface LineaPedido {
  id: number;
  cantidad: number;
}

export interface NuevoPedido {
  cliente: string;
  cp: string;
  productos: LineaPedido[];
}

export class ConstructorPedido {
  private cliente = 'Cliente QA';
  private cp = '06600';
  private lineas: LineaPedido[] = [];

  paraCliente(cliente: string): this {
    this.cliente = cliente;
    return this;
  }

  enCodigoPostal(cp: string): this {
    this.cp = cp;
    return this;
  }

  conProducto(id: number, cantidad = 1): this {
    const existente = this.lineas.find((l) => l.id === id);
    if (existente) existente.cantidad += cantidad;
    else this.lineas.push({ id, cantidad });
    return this;
  }

  construir(): NuevoPedido {
    if (this.lineas.length === 0) throw new Error('El pedido necesita al menos un producto');
    return { cliente: this.cliente, cp: this.cp, productos: this.lineas.map((l) => ({ ...l })) };
  }
}

export async function reintentar<T>(fn: () => Promise<T>, intentos: number): Promise<T> {
  let ultimoError: unknown;
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn();
    } catch (error) {
      ultimoError = error;
    }
  }
  throw ultimoError;
}

export abstract class Repositorio<T extends { id: number }> {
  protected elementos = new Map<number, T>();

  protected abstract validar(elemento: T): string | null;

  guardar(elemento: T): void {
    const error = this.validar(elemento);
    if (error) throw new Error(error);
    this.elementos.set(elemento.id, elemento);
  }

  obtener(id: number): T | undefined {
    return this.elementos.get(id);
  }

  todos(): T[] {
    return [...this.elementos.values()];
  }
}

export interface Usuario {
  id: number;
  correo: string;
}

export class RepositorioUsuarios extends Repositorio<Usuario> {
  protected validar(usuario: Usuario): string | null {
    return usuario.correo.includes('@') ? null : `Correo inválido: ${usuario.correo}`;
  }
}
