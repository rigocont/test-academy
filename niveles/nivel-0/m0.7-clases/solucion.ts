export interface Articulo {
  nombre: string;
  precio: number;
  cantidad: number;
}

export class Carrito {
  private articulos: Articulo[] = [];

  agregar(nombre: string, precio: number): void {
    const existente = this.articulos.find((a) => a.nombre === nombre);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.articulos.push({ nombre, precio, cantidad: 1 });
    }
  }

  quitar(nombre: string): void {
    this.articulos = this.articulos.filter((a) => a.nombre !== nombre);
  }

  cantidadTotal(): number {
    let total = 0;
    for (const a of this.articulos) total += a.cantidad;
    return total;
  }

  total(): number {
    let total = 0;
    for (const a of this.articulos) total += a.precio * a.cantidad;
    return total;
  }

  vaciar(): void {
    this.articulos = [];
  }

  lista(): Articulo[] {
    return this.articulos.map((a) => ({ ...a }));
  }
}

export class Usuario {
  bloqueado = false;

  constructor(
    public nombre: string,
    private contrasena: string,
  ) {}

  bloquear(): void {
    this.bloqueado = true;
  }

  puedeEntrar(contrasena: string): boolean {
    return !this.bloqueado && contrasena === this.contrasena;
  }
}
