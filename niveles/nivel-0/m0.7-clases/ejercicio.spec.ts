import { test, expect } from '@playwright/test';
import { Carrito, Usuario } from './ejercicio';

test.describe('Carrito', () => {
  let carrito: Carrito;

  // beforeEach corre antes de cada prueba: cada una empieza con un carrito nuevo.
  test.beforeEach(() => {
    carrito = new Carrito();
  });

  test('empieza vacío', () => {
    expect(carrito.cantidadTotal()).toBe(0);
    expect(carrito.total()).toBe(0);
  });

  test('agregar el mismo producto suma la cantidad', () => {
    carrito.agregar('Taza térmica', 249);
    carrito.agregar('Taza térmica', 249);
    expect(carrito.lista()).toEqual([{ nombre: 'Taza térmica', precio: 249, cantidad: 2 }]);
  });

  test('calcula cantidad y total', () => {
    carrito.agregar('Taza térmica', 249);
    carrito.agregar('Taza térmica', 249);
    carrito.agregar('Cuaderno de notas', 99);
    expect(carrito.cantidadTotal()).toBe(3);
    expect(carrito.total()).toBe(597);
  });

  test('quitar elimina todas las unidades del producto', () => {
    carrito.agregar('Taza térmica', 249);
    carrito.agregar('Cuaderno de notas', 99);
    carrito.quitar('Taza térmica');
    expect(carrito.lista().map((a) => a.nombre)).toEqual(['Cuaderno de notas']);
  });

  test('vaciar deja el carrito en cero', () => {
    carrito.agregar('Taza térmica', 249);
    carrito.vaciar();
    expect(carrito.cantidadTotal()).toBe(0);
  });
});

test.describe('Usuario', () => {
  test('entra con la contraseña correcta', () => {
    const u = new Usuario('estandar', 'secreto123');
    expect(u.puedeEntrar('secreto123')).toBe(true);
    expect(u.puedeEntrar('otra')).toBe(false);
  });

  test('un usuario bloqueado no entra', () => {
    const u = new Usuario('bloqueado', 'secreto123');
    u.bloquear();
    expect(u.bloqueado).toBe(true);
    expect(u.puedeEntrar('secreto123')).toBe(false);
  });
});
