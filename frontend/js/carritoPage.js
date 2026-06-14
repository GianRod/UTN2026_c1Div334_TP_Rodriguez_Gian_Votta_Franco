// Redirigir si no hay nombre
if (!sessionStorage.getItem('nombreUsuario')) {
  window.location.href = 'bienvenida.html';
}

function renderCarrito() {
  const carrito = obtenerCarrito();
  const lista = document.getElementById('carrito-lista');
  const resumen = document.getElementById('carrito-resumen');

  if (!carrito.length) {
    lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
    resumen.style.display = 'none';
    return;
  }

  lista.innerHTML = carrito.map(item => `
    <div class="carrito-item" data-id="${item.id}">
      ${item.imagen ? `<img src="http://localhost:3000${item.imagen}" alt="${item.nombre}" />` : ''}
      <div class="carrito-item-info">
        <h4>${item.nombre}</h4>
        <span class="precio">$${(item.precio * item.cantidad).toFixed(2)}</span>
      </div>
      <div class="carrito-item-controls">
        <button class="qty-btn btn-restar" data-id="${item.id}">−</button>
        <span class="qty-display">${item.cantidad}</span>
        <button class="qty-btn btn-sumar" data-id="${item.id}">+</button>
      </div>
      <button class="btn-eliminar" data-id="${item.id}" title="Eliminar">🗑</button>
    </div>
  `).join('');

  document.getElementById('total-precio').textContent = `$${totalCarrito().toFixed(2)}`;
  resumen.style.display = 'flex';

  lista.querySelectorAll('.btn-sumar').forEach(btn => {
    btn.addEventListener('click', () => { cambiarCantidad(Number(btn.dataset.id), 1); renderCarrito(); });
  });
  lista.querySelectorAll('.btn-restar').forEach(btn => {
    btn.addEventListener('click', () => { cambiarCantidad(Number(btn.dataset.id), -1); renderCarrito(); });
  });
  lista.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => { eliminarDelCarrito(Number(btn.dataset.id)); renderCarrito(); });
  });
}

// Modal confirmación
document.getElementById('btn-confirmar').addEventListener('click', () => {
  const nombre = sessionStorage.getItem('nombreUsuario');
  document.getElementById('modal-nombre').textContent = nombre;
  document.getElementById('modal-confirmar').classList.remove('hidden');
});

document.getElementById('btn-modal-cancelar').addEventListener('click', () => {
  document.getElementById('modal-confirmar').classList.add('hidden');
});

document.getElementById('btn-modal-ok').addEventListener('click', async () => {
  document.getElementById('modal-confirmar').classList.add('hidden');
  const nombre = sessionStorage.getItem('nombreUsuario');
  const carrito = obtenerCarrito();

  try {
    const venta = await api.post('/ventas', {
      nombre_usuario: nombre,
      productos: carrito.map(i => ({ id: i.id, cantidad: i.cantidad, precio: i.precio })),
    });
    // Guardar ticket en sessionStorage y redirigir
    sessionStorage.setItem('ultimaVenta', JSON.stringify({ venta, carrito, nombre }));
    vaciarCarrito();
    window.location.href = 'ticket.html';
  } catch {
    alert('Error al confirmar la compra. Intentá de nuevo.');
  }
});

renderCarrito();
