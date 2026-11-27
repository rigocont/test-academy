import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '../framework/fixtures';
import { nuevoPedido } from '../framework/datos/generadores';
import type { NuevoPedido } from '../framework/clientes/tipos';

// ---------- 1. Ejemplo: casos en un arreglo ----------
const casosCodigoPostal = [
  { cp: '0660', valido: false, motivo: '4 dígitos' },
  { cp: '06600', valido: true, motivo: '5 dígitos' },
  { cp: '066000', valido: false, motivo: '6 dígitos' },
  { cp: '0660A', valido: false, motivo: 'con letra' },
];

for (const { cp, valido, motivo } of casosCodigoPostal) {
  test(`código postal ${motivo} (${cp}) → ${valido ? 'acepta' : 'rechaza'}`, async ({ pedidos }) => {
    const respuesta = await pedidos.crear(nuevoPedido({ cp }));
    expect(respuesta.status()).toBe(valido ? 201 : 400);
  });
}

export type Caso = { titulo: string; pedido: Partial<NuevoPedido>; status: number; error?: string };

// ---------- 2. Valores límite de la cantidad ----------
const ERROR_CANTIDAD = 'La cantidad debe ser un entero entre 1 y 10';
const casosCantidad: Caso[] = [0, 1, 10, 11, 2.5].map((cantidad) => {
  const valida = Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= 10;
  return {
    titulo: `cantidad ${cantidad}`,
    pedido: { productos: [{ id: 1, cantidad }] },
    status: valida ? 201 : 400,
    error: valida ? undefined : ERROR_CANTIDAD,
  };
});

// ---------- 3. Particiones del nombre del cliente ----------
const ERROR_CLIENTE = 'El cliente debe tener entre 2 y 50 caracteres';
const casosCliente: Caso[] = [
  { titulo: 'cliente vacío', pedido: { cliente: '' }, status: 400, error: ERROR_CLIENTE },
  { titulo: 'cliente de 1 caracter', pedido: { cliente: 'A' }, status: 400, error: ERROR_CLIENTE },
  { titulo: 'cliente de 2 caracteres', pedido: { cliente: 'Al' }, status: 201 },
  { titulo: 'cliente de 50 caracteres', pedido: { cliente: 'A'.repeat(50) }, status: 201 },
  { titulo: 'cliente de 51 caracteres', pedido: { cliente: 'A'.repeat(51) }, status: 400, error: ERROR_CLIENTE },
  { titulo: 'cliente con solo espacios', pedido: { cliente: '     ' }, status: 400, error: ERROR_CLIENTE },
];

for (const caso of [...casosCantidad, ...casosCliente]) {
  test(`${caso.titulo} → ${caso.status}`, async ({ pedidos }) => {
    const respuesta = await pedidos.crear(nuevoPedido(caso.pedido));
    expect(respuesta.status()).toBe(caso.status);
    if (caso.error) expect((await respuesta.json()).error).toBe(caso.error);
  });
}

// ---------- 4. Casos desde un archivo ----------
const CSV = readFileSync(join(import.meta.dirname, '..', 'framework', 'datos', 'productos.csv'), 'utf-8');
const productos = CSV.trim()
  .split('\n')
  .slice(1)
  .map((linea) => {
    const [id, nombre, precio] = linea.split(',');
    return { id: Number(id), nombre, precio: Number(precio) };
  });

test.describe('precios según productos.csv', () => {
  for (const producto of productos) {
    test(`${producto.nombre} cuesta ${producto.precio}`, async ({ request }) => {
      const respuesta = await request.get(`/api/productos/${producto.id}`, { params: { retraso: 0 } });
      expect(await respuesta.json()).toMatchObject({ nombre: producto.nombre, precio: producto.precio });
    });
  }
});
