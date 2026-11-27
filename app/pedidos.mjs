// API de autenticación y pedidos de la tienda de práctica (Nivel 2 en adelante).
//
//   POST   /api/login                 { usuario, contrasena } → 200 { token, usuario } | 401 | 403
//   GET    /api/pedidos               ?estado= &cliente= &pagina=1 &porPagina=10 → { datos, pagina, porPagina, total }
//   GET    /api/pedidos/:id
//   POST   /api/pedidos               { cliente, cp, productos: [{ id, cantidad }] } → 201 | 400
//   PATCH  /api/pedidos/:id           { estado } → 200 | 400 | 409 (transición no permitida)
//   PUT    /api/pedidos/:id/notas     { notas } → 200 (idempotente)
//   DELETE /api/pedidos/:id           → 204 | 404 | 409 (solo pendiente o cancelado)
//   POST   /api/reportes              { estado? } → 202 { id, estado: 'procesando' }   (Nivel 3: API asíncrona)
//   GET    /api/reportes/:id          → { id, estado: 'procesando' } y, después de ~1.5 s, { id, estado: 'listo', resultado }
//
// Todas las rutas de pedidos piden el header  Authorization: Bearer <token>.

import { randomBytes } from 'node:crypto';

const USUARIOS = { estandar: 'activo', bloqueado: 'bloqueado', lento: 'activo', admin: 'activo' };
const CONTRASENA = 'secreto123';

export const ESTADOS = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];
export const TRANSICIONES = {
  pendiente: ['pagado', 'cancelado'],
  pagado: ['enviado', 'cancelado'],
  enviado: ['entregado'],
  entregado: [],
  cancelado: [],
};

const tokens = new Map(); // token → usuario
const reportes = new Map(); // id → { listoEn, filtro }
let siguienteReporte = 1;
let pedidos = [];
let siguienteId = 1;

function semilla(productos) {
  const clientes = ['Ana López', 'Luis Pérez', 'Marta Ruiz', 'Jorge Díaz', 'Sofía Vega', 'Pablo Cruz'];
  const estados = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado', 'pagado'];
  pedidos = [];
  siguienteId = 1;
  for (let i = 0; i < 12; i++) {
    const producto = productos[i % productos.length];
    const cantidad = (i % 3) + 1;
    pedidos.push({
      id: siguienteId++,
      cliente: clientes[i % clientes.length],
      cp: String(10000 + i * 1111).padStart(5, '0'),
      productos: [{ id: producto.id, cantidad }],
      total: producto.precio * cantidad,
      estado: estados[i % estados.length],
      notas: '',
    });
  }
}

function validarPedido(datos, productos) {
  if (!datos || typeof datos !== 'object') return 'El cuerpo debe ser JSON válido';
  if (typeof datos.cliente !== 'string' || datos.cliente.trim().length < 2 || datos.cliente.length > 50)
    return 'El cliente debe tener entre 2 y 50 caracteres';
  if (typeof datos.cp !== 'string' || !/^\d{5}$/.test(datos.cp)) return 'El código postal debe tener 5 dígitos';
  if (!Array.isArray(datos.productos) || datos.productos.length === 0) return 'El pedido necesita al menos un producto';
  for (const linea of datos.productos) {
    if (!productos.some((p) => p.id === linea?.id)) return `El producto ${linea?.id} no existe`;
    if (!Number.isInteger(linea.cantidad) || linea.cantidad < 1 || linea.cantidad > 10)
      return 'La cantidad debe ser un entero entre 1 y 10';
  }
  return null;
}

function usuarioDelToken(req) {
  const header = req.headers.authorization ?? '';
  const [tipo, token] = header.split(' ');
  return tipo === 'Bearer' ? tokens.get(token) : undefined;
}

/**
 * Atiende /api/login y /api/pedidos. Devuelve true si atendió la ruta.
 */
export async function atenderPedidos(req, res, url, { json, leerCuerpo, productos }) {
  const partes = url.pathname.split('/').filter(Boolean); // ['api', 'pedidos', '3', 'notas']
  const recurso = partes[1];

  if (recurso === 'login' && req.method === 'POST') {
    const datos = await leerCuerpo(req);
    const usuario = datos?.usuario;
    if (!(usuario in USUARIOS) || datos?.contrasena !== CONTRASENA) {
      json(res, 401, { error: 'Usuario o contraseña incorrectos' });
      return true;
    }
    if (USUARIOS[usuario] === 'bloqueado') {
      json(res, 403, { error: 'Este usuario está bloqueado' });
      return true;
    }
    const token = 'tk-' + randomBytes(12).toString('hex');
    tokens.set(token, usuario);
    json(res, 200, { token, usuario });
    return true;
  }

  if (recurso !== 'pedidos' && recurso !== 'reportes') return false;
  if (pedidos.length === 0) semilla(productos);

  if (!usuarioDelToken(req)) {
    json(res, 401, { error: 'Token inválido o ausente' });
    return true;
  }

  if (recurso === 'reportes') {
    const idReporte = partes[2] ? Number(partes[2]) : undefined;
    if (req.method === 'POST' && idReporte === undefined) {
      const datos = (await leerCuerpo(req)) ?? {};
      if (datos.estado !== undefined && !ESTADOS.includes(datos.estado)) {
        json(res, 400, { error: `Estado inválido. Usa uno de: ${ESTADOS.join(', ')}` });
        return true;
      }
      const id = siguienteReporte++;
      reportes.set(id, { listoEn: Date.now() + 1500, filtro: datos.estado });
      json(res, 202, { id, estado: 'procesando' });
      return true;
    }
    if (req.method === 'GET' && idReporte !== undefined) {
      const reporte = reportes.get(idReporte);
      if (!reporte) {
        json(res, 404, { error: 'Reporte no encontrado' });
        return true;
      }
      if (Date.now() < reporte.listoEn) {
        json(res, 200, { id: idReporte, estado: 'procesando' });
        return true;
      }
      const incluidos = pedidos.filter((p) => !reporte.filtro || p.estado === reporte.filtro);
      json(res, 200, {
        id: idReporte,
        estado: 'listo',
        resultado: { pedidos: incluidos.length, total: incluidos.reduce((s, p) => s + p.total, 0) },
      });
      return true;
    }
    json(res, 405, { error: 'Método no permitido' });
    return true;
  }

  const id = partes[2] ? Number(partes[2]) : undefined;
  const subrecurso = partes[3];
  const pedido = id === undefined ? undefined : pedidos.find((p) => p.id === id);

  if (req.method === 'GET' && id === undefined) {
    const estado = url.searchParams.get('estado');
    const cliente = url.searchParams.get('cliente')?.toLowerCase();
    const pagina = Math.max(1, Number(url.searchParams.get('pagina') ?? 1));
    const porPagina = Math.min(50, Math.max(1, Number(url.searchParams.get('porPagina') ?? 10)));
    const filtrados = pedidos.filter(
      (p) => (!estado || p.estado === estado) && (!cliente || p.cliente.toLowerCase().includes(cliente)),
    );
    json(res, 200, {
      datos: filtrados.slice((pagina - 1) * porPagina, pagina * porPagina),
      pagina,
      porPagina,
      total: filtrados.length,
    });
    return true;
  }

  if (req.method === 'POST' && id === undefined) {
    const datos = await leerCuerpo(req);
    const error = validarPedido(datos, productos);
    if (error) {
      json(res, 400, { error });
      return true;
    }
    const total = datos.productos.reduce(
      (suma, l) => suma + productos.find((p) => p.id === l.id).precio * l.cantidad,
      0,
    );
    const nuevo = {
      id: siguienteId++,
      cliente: datos.cliente.trim(),
      cp: datos.cp,
      productos: datos.productos.map((l) => ({ id: l.id, cantidad: l.cantidad })),
      total,
      estado: 'pendiente',
      notas: '',
    };
    pedidos.push(nuevo);
    json(res, 201, nuevo);
    return true;
  }

  if (id !== undefined && !pedido) {
    json(res, 404, { error: 'Pedido no encontrado' });
    return true;
  }

  if (req.method === 'GET' && !subrecurso) {
    json(res, 200, pedido);
    return true;
  }

  if (req.method === 'PATCH' && !subrecurso) {
    const datos = await leerCuerpo(req);
    if (!ESTADOS.includes(datos?.estado)) {
      json(res, 400, { error: `Estado inválido. Usa uno de: ${ESTADOS.join(', ')}` });
      return true;
    }
    if (!TRANSICIONES[pedido.estado].includes(datos.estado)) {
      json(res, 409, { error: `Transición no permitida: ${pedido.estado} → ${datos.estado}` });
      return true;
    }
    pedido.estado = datos.estado;
    json(res, 200, pedido);
    return true;
  }

  if (req.method === 'PUT' && subrecurso === 'notas') {
    const datos = await leerCuerpo(req);
    if (typeof datos?.notas !== 'string') {
      json(res, 400, { error: 'Las notas deben ser texto' });
      return true;
    }
    pedido.notas = datos.notas;
    json(res, 200, pedido);
    return true;
  }

  if (req.method === 'DELETE' && !subrecurso) {
    if (!['pendiente', 'cancelado'].includes(pedido.estado)) {
      json(res, 409, { error: 'Solo se pueden borrar pedidos pendientes o cancelados' });
      return true;
    }
    pedidos = pedidos.filter((p) => p.id !== id);
    json(res, 204);
    return true;
  }

  json(res, 405, { error: 'Método no permitido' });
  return true;
}
