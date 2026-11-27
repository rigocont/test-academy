import { test, expect } from '@playwright/test';
import { ConstructorPedido, RepositorioUsuarios, reintentar } from './ejercicio';

test.describe('ConstructorPedido', () => {
  test('usa valores por defecto y encadena', () => {
    const pedido = new ConstructorPedido().conProducto(4, 2).construir();
    expect(pedido).toEqual({ cliente: 'Cliente QA', cp: '06600', productos: [{ id: 4, cantidad: 2 }] });
  });

  test('suma cantidades del mismo producto', () => {
    const pedido = new ConstructorPedido().paraCliente('Ana').enCodigoPostal('01000').conProducto(1).conProducto(1, 3).conProducto(2).construir();
    expect(pedido).toEqual({ cliente: 'Ana', cp: '01000', productos: [{ id: 1, cantidad: 4 }, { id: 2, cantidad: 1 }] });
  });

  test('sin productos lanza error', () => {
    expect(() => new ConstructorPedido().construir()).toThrow('El pedido necesita al menos un producto');
  });

  test('construir devuelve copias independientes', () => {
    const constructor = new ConstructorPedido().conProducto(1);
    const a = constructor.construir();
    a.productos[0].cantidad = 99;
    expect(constructor.construir().productos[0].cantidad).toBe(1);
  });
});

test.describe('reintentar', () => {
  test('devuelve el valor cuando un intento funciona', async () => {
    let llamadas = 0;
    const valor = await reintentar(async () => {
      llamadas++;
      if (llamadas < 3) throw new Error(`fallo ${llamadas}`);
      return 'ok';
    }, 3);
    expect(valor).toBe('ok');
    expect(llamadas).toBe(3);
  });

  test('lanza el último error si todos fallan', async () => {
    let llamadas = 0;
    await expect(
      reintentar(async () => {
        llamadas++;
        throw new Error(`fallo ${llamadas}`);
      }, 2),
    ).rejects.toThrow('fallo 2');
    expect(llamadas).toBe(2);
  });
});

test.describe('Repositorio genérico', () => {
  test('guarda, obtiene y lista', () => {
    const repo = new RepositorioUsuarios();
    repo.guardar({ id: 1, correo: 'ana@ejemplo.com' });
    repo.guardar({ id: 2, correo: 'luis@ejemplo.com' });
    expect(repo.obtener(2)?.correo).toBe('luis@ejemplo.com');
    expect(repo.todos()).toHaveLength(2);
  });

  test('valida con la regla de la subclase', () => {
    const repo = new RepositorioUsuarios();
    expect(() => repo.guardar({ id: 3, correo: 'sin-arroba' })).toThrow('Correo inválido: sin-arroba');
    expect(repo.todos()).toHaveLength(0);
  });
});
