import { test, expect } from '@playwright/test';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ request }) => {
  await request.post('/api/reiniciar');
});

test('ejemplo: GET de un producto', async ({ request }) => {
  const respuesta = await request.get('/api/productos/3');
  expect(respuesta.status()).toBe(200);
  const producto: Producto = await respuesta.json();
  expect(producto.nombre).toBe('Audífonos inalámbricos');
  expect(producto.precio).toBe(1299);
});

test('GET de la lista de productos', async ({ request }) => {
  const respuesta = await request.get('/api/productos');
  await expect(respuesta).toBeOK();
  const productos: Producto[] = await respuesta.json();
  expect(productos).toHaveLength(6);
});

test('GET con query param', async ({ request }) => {
  const respuesta = await request.get('/api/productos', { params: { categoria: 'hogar' } });
  await expect(respuesta).toBeOK();
  const productos: Producto[] = await respuesta.json();
  expect(productos.length).toBeGreaterThan(0);
  for (const p of productos) expect(p.categoria).toBe('hogar');
});

test('GET de un producto que no existe', async ({ request }) => {
  const respuesta = await request.get('/api/productos/999');
  expect(respuesta.status()).toBe(404);
  expect(await respuesta.json()).toEqual({ error: 'Producto no encontrado' });
});

test('POST crea un usuario', async ({ request }) => {
  const datos = { nombre: 'Rosa Díaz', correo: 'rosa@ejemplo.com' };
  const respuesta = await request.post('/api/usuarios', { data: datos });
  expect(respuesta.status()).toBe(201);
  const usuario: Usuario = await respuesta.json();
  expect(usuario.id).toEqual(expect.any(Number));
  expect(usuario).toMatchObject({ ...datos, rol: 'qa' });
});

test('POST con correo inválido', async ({ request }) => {
  const respuesta = await request.post('/api/usuarios', { data: { nombre: 'Rosa', correo: 'rosa-ejemplo.com' } });
  expect(respuesta.status()).toBe(400);
  expect(await respuesta.json()).toEqual({ error: 'El correo no es válido' });
});

test('DELETE borra un usuario', async ({ request }) => {
  const creado: Usuario = await (await request.post('/api/usuarios', { data: { nombre: 'Temporal', correo: 't@ejemplo.com' } })).json();
  const borrado = await request.delete(`/api/usuarios/${creado.id}`);
  expect(borrado.status()).toBe(204);
  const consulta = await request.get(`/api/usuarios/${creado.id}`);
  expect(consulta.status()).toBe(404);
});
