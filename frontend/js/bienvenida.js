document.getElementById('form-nombre').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('input-nombre').value.trim();
  const errorEl = document.getElementById('error-nombre');

  if (!nombre) {
    errorEl.classList.remove('hidden');
    return;
  }
  errorEl.classList.add('hidden');
  sessionStorage.setItem('nombreUsuario', nombre);
  window.location.href = 'productos.html';
});
