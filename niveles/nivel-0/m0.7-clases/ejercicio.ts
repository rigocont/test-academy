// M0.7 Clases básicas
// Una clase junta datos (propiedades) y acciones (métodos).
// En el Nivel 2 vas a usar esto mismo para construir Page Objects.
// Corre las pruebas con:  npx playwright test m0.7

export interface Articulo {
  nombre: string;
  precio: number;
  cantidad: number;
}

export class Carrito {
  // La lista de artículos empieza vacía. Es privada: solo se cambia con los métodos.
  private articulos: Articulo[] = [];

  /**
   * 1. Agrega un artículo. Si ya existe uno con el mismo nombre,
   *    solo suma 1 a su cantidad en lugar de agregarlo otra vez.
   */
  agregar(nombre: string, precio: number): void {
    // TODO
  }

  /** 2. Quita el artículo con ese nombre (todas sus unidades). */
  quitar(nombre: string): void {
    // TODO
  }

  /** 3. Total de unidades en el carrito (suma de cantidades). */
  cantidadTotal(): number {
    // TODO
    return -1;
  }

  /** 4. Total a pagar: suma de precio × cantidad. */
  total(): number {
    // TODO
    return -1;
  }

  /** 5. Deja el carrito vacío. */
  vaciar(): void {
    // TODO
  }

  /** Ya está hecho: devuelve una copia de la lista para poder revisarla. */
  lista(): Articulo[] {
    return this.articulos.map((a) => ({ ...a }));
  }
}

/**
 * 6. Reto: completa la clase Usuario.
 *    - El constructor recibe nombre y contrasena y los guarda.
 *    - bloqueado empieza en false.
 *    - puedeEntrar(contrasena) es true solo si no está bloqueado y la contraseña coincide.
 */
export class Usuario {
  bloqueado = false;

  constructor(
    public nombre: string,
    private contrasena: string,
  ) {}

  bloquear(): void {
    // TODO
  }

  puedeEntrar(contrasena: string): boolean {
    // TODO
    return false;
  }
}
