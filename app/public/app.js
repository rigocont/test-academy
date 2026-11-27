// Funciones compartidas por las páginas de la tienda.
const Tienda = {
  usuario() { return localStorage.getItem('usuario'); },
  token() { return localStorage.getItem('token'); },
  exigirSesion() { if (!this.usuario()) location.href = '/'; },
  carrito() { return JSON.parse(localStorage.getItem('carrito') ?? '[]'); },
  guardarCarrito(items) { localStorage.setItem('carrito', JSON.stringify(items)); this.pintarContador(); },
  agregar(producto) {
    const items = this.carrito();
    const existente = items.find((i) => i.id === producto.id);
    if (existente) existente.cantidad += 1; else items.push({ ...producto, cantidad: 1 });
    this.guardarCarrito(items);
  },
  quitar(id) { this.guardarCarrito(this.carrito().filter((i) => i.id !== id)); },
  cantidadTotal() { return this.carrito().reduce((s, i) => s + i.cantidad, 0); },
  total() { return this.carrito().reduce((s, i) => s + i.precio * i.cantidad, 0); },
  precio(n) { return '$' + n.toLocaleString('es-MX') + ' MXN'; },
  pintarContador() {
    const c = document.querySelector('[data-testid="contador-carrito"]');
    if (c) c.textContent = String(this.cantidadTotal());
  },
  cerrarSesion() { localStorage.clear(); location.href = '/'; },
};

function encabezado() {
  const h = document.createElement('header');
  h.innerHTML = `
    <strong>Tienda QA</strong>
    <nav aria-label="Principal">
      <a href="/productos.html">Productos</a>
      <a href="/pedidos.html">Pedidos</a>
      <a href="/reportes.html">Reportes</a>
      <a href="/herramientas.html">Herramientas</a>
      <a href="/carrito.html">Carrito <span class="contador" data-testid="contador-carrito">0</span></a>
      <span data-testid="usuario-actual">${Tienda.usuario() ?? ''}</span>
      <button class="secundario" type="button" id="cerrar-sesion">Cerrar sesión</button>
    </nav>`;
  document.body.prepend(h);
  h.querySelector('#cerrar-sesion').addEventListener('click', () => Tienda.cerrarSesion());
  Tienda.pintarContador();
}
