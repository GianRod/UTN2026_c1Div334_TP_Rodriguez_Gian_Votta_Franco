const datos = JSON.parse(sessionStorage.getItem('ultimaVenta') || 'null');

if (!datos) {
  window.location.href = 'bienvenida.html';
}

const { carrito, nombre } = datos;

document.getElementById('ticket-nombre').textContent = nombre;
document.getElementById('ticket-fecha').textContent = new Date().toLocaleString('es-AR');

const lista = document.getElementById('ticket-items');
let total = 0;
carrito.forEach(item => {
  const subtotal = item.precio * item.cantidad;
  total += subtotal;
  const li = document.createElement('li');
  li.innerHTML = `<span>${item.nombre} x${item.cantidad}</span><span>$${subtotal.toFixed(2)}</span>`;
  lista.appendChild(li);
});

document.getElementById('ticket-total').textContent = `$${total.toFixed(2)}`;

// Descargar PDF usando print
document.getElementById('btn-descargar-pdf').addEventListener('click', () => {
  const tituloOriginal = document.title;
  document.title = ' ';
  window.print();
  document.title = tituloOriginal;
});

// Salir: limpiar sesión y volver al inicio
document.getElementById('btn-salir').addEventListener('click', () => {
  sessionStorage.removeItem('ultimaVenta');
  sessionStorage.removeItem('nombreUsuario');
  window.location.href = 'bienvenida.html';
});
