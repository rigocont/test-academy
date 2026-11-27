import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '../framework/fixtures';
import { nuevoPedido } from '../framework/datos/generadores';
import type { NuevoPedido } from '../framework/clientes/tipos';
import { porResolver } from '../framework/soporte';

// M2.13 Pruebas guiadas por datos (data-driven)
// Una sola prueba escrita una vez, que corre con muchos datos.
// En Playwright se hace con un ciclo que crea un test() por cada caso.
//   npx playwright test m2.13
//   npx playwright test m2.13 --list     (lista todos los casos generados)

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

// ---------- 2. Valores límite de la cantidad (entre 1 y 10) ----------
// TODO: arma el arreglo con los valores límite y genera una prueba por cada uno.
//       Debe incluir 0, 1, 10 y 11, y un decimal (2.5).

// ---------- 3. Particiones de equivalencia del nombre del cliente (2 a 50 caracteres) ----------
// TODO: una prueba por partición: vacío, 1 caracter, 2, 50, 51 y solo espacios.

// ---------- 4. Casos desde un archivo ----------
// Los precios esperados viven en framework/datos/productos.csv.
// TODO: lee el CSV (puedes reutilizar tu leerCsv de M2.7) y genera una prueba por producto que
//       valide por API que GET /api/productos/:id devuelve ese nombre y precio.
const CSV = readFileSync(join(import.meta.dirname, '..', 'framework', 'datos', 'productos.csv'), 'utf-8');
void CSV;

test('TODO: casos de cantidad, cliente y CSV', () => {
  porResolver('escribe las secciones 2, 3 y 4 y borra esta prueba');
});

// Tipo de ayuda para tus casos
export type Caso = { titulo: string; pedido: Partial<NuevoPedido>; status: number; error?: string };
