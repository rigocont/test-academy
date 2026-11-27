# M0.7 Clases básicas (8 h)

## Objetivo

Crear clases con propiedades, métodos y constructor. Es la base del Page Object Model del Nivel 2.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Qué es una clase y qué es un objeto (instancia) |
| 30 min | Propiedades, métodos, constructor, `this` |
| 15 min | `private` y `public` |
| 25 min | Vista previa: cómo se ve un Page Object |

## Conceptos clave

```ts
class Contador {
  private valor = 0;            // propiedad: dato que guarda el objeto

  incrementar(): void {         // método: acción que hace el objeto
    this.valor++;               // this = "este objeto"
  }

  actual(): number {
    return this.valor;
  }
}

const c = new Contador();       // new crea una instancia
c.incrementar();
c.actual();                     // 1

// Constructor con propiedades en una línea
class Usuario {
  constructor(public nombre: string, private contrasena: string) {}
}
```

Vista previa del Nivel 2. Un Page Object es una clase que representa una página:

```ts
class PaginaLogin {
  constructor(private page: Page) {}

  async entrar(usuario: string, contrasena: string) {
    await this.page.getByLabel('Usuario').fill(usuario);
    await this.page.getByLabel('Contraseña').fill(contrasena);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }
}
```

## Lab (4 h)

Completa `Carrito` y `Usuario` en `ejercicio.ts`. Corre `npx playwright test m0.7`.
Fíjate en `beforeEach` del archivo de pruebas: lo vas a usar mucho en el Nivel 1.

## Preguntas de repaso

1. ¿Qué diferencia hay entre una clase y un objeto?
2. ¿Por qué `articulos` es `private`?
3. ¿Qué ventaja tiene poner las acciones de una página en una clase?

## Para el instructor

- El error más común es olvidar `this.`. TypeScript lo marca; úsalo para enseñar a leer el mensaje de error.
