// Manejo del carrito en localStorage — compartido entre páginas

const CARRITO_KEY = 'carrito';

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_KEY) || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarBadge();
}

function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(i => i.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarrito(carrito);
}

function cambiarCantidad(id, delta) {
  const carrito = obtenerCarrito();
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    return eliminarDelCarrito(id);
  }
  guardarCarrito(carrito);
}

function eliminarDelCarrito(id) {
  const carrito = obtenerCarrito().filter(i => i.id !== id);
  guardarCarrito(carrito);
}

function vaciarCarrito() {
  localStorage.removeItem(CARRITO_KEY);
  actualizarBadge();
}

function totalCarrito() {
  return obtenerCarrito().reduce((acc, i) => acc + i.precio * i.cantidad, 0);
}

function actualizarBadge() {
  const badge = document.getElementById('nav-cart-count');
  if (!badge) return;
  const total = obtenerCarrito().reduce((acc, i) => acc + i.cantidad, 0);
  badge.textContent = total;
}

// Aplicar tema guardado y actualizar badge al cargar
(function init() {
  const tema = localStorage.getItem('tema') || 'light';
  document.documentElement.setAttribute('data-theme', tema);
  actualizarBadge();
  const btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    btnTheme.textContent = tema === 'dark' ? '☀️' : '🌙';
    btnTheme.addEventListener('click', () => {
      const actual = document.documentElement.getAttribute('data-theme');
      const nuevo = actual === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nuevo);
      localStorage.setItem('tema', nuevo);
      btnTheme.textContent = nuevo === 'dark' ? '☀️' : '🌙';
    });
  }
})();
