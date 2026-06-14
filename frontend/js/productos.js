// Redirigir si no hay nombre de usuario
if (!sessionStorage.getItem('nombreUsuario')) {
  window.location.href = 'bienvenida.html';
}

const ITEMS_POR_PAGINA = 8;
let paginaActual = 1;
let categoriaActual = '';

async function cargarProductos(pagina = 1, categoria = '') {
  const grid = document.getElementById('productos-grid');
  const paginacionEl = document.getElementById('paginacion');
  grid.innerHTML = '<p class="loading">Cargando...</p>';

  try {
    const params = new URLSearchParams({ page: pagina, limit: ITEMS_POR_PAGINA });
    if (categoria) params.set('categoria', categoria);
    const data = await api.get(`/productos?${params}`);

    renderCategorias(data.productos);
    renderProductos(data.productos, grid);
    renderPaginacion(data.totalPaginas, pagina, paginacionEl);
    paginaActual = pagina;
  } catch {
    grid.innerHTML = '<p class="error">Error al cargar productos. ¿El servidor está corriendo?</p>';
  }
}

function renderCategorias(productos) {
  const cats = [...new Set(productos.map(p => p.categoria))];
  const cont = document.getElementById('categorias-dinamicas');
  if (!cont) return;
  cont.innerHTML = cats.map(c =>
    `<button class="btn-categoria${categoriaActual === c ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
  cont.querySelectorAll('.btn-categoria').forEach(btn => {
    btn.addEventListener('click', () => seleccionarCategoria(btn.dataset.cat));
  });
}

function renderProductos(productos, grid) {
  if (!productos.length) {
    grid.innerHTML = '<p class="loading">No hay productos disponibles.</p>';
    return;
  }
  const carrito = obtenerCarrito();
  grid.innerHTML = productos.map(p => {
    const enCarrito = carrito.find(i => i.id === p.id);
    const qty = enCarrito ? enCarrito.cantidad : 0;
    return `
      <div class="producto-card" data-id="${p.id}">
        ${p.imagen ? `<img src="http://localhost:3000${p.imagen}" alt="${p.nombre}" />` : ''}
        <h3>${p.nombre}</h3>
        <p class="precio">$${p.precio}</p>
        <p class="categoria">${p.categoria}</p>
        <div class="acciones-card">
          <button class="qty-btn btn-restar" data-id="${p.id}">−</button>
          <span class="qty-display" id="qty-${p.id}">${qty}</span>
          <button class="qty-btn btn-sumar" data-id="${p.id}">+</button>
          <button class="btn btn-primary btn-agregar" data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-imagen="${p.imagen || ''}">
            Agregar
          </button>
        </div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', () => {
      agregarAlCarrito({ id: Number(btn.dataset.id), nombre: btn.dataset.nombre, precio: Number(btn.dataset.precio), imagen: btn.dataset.imagen });
      actualizarQtyDisplay(Number(btn.dataset.id));
    });
  });
  grid.querySelectorAll('.btn-sumar').forEach(btn => {
    btn.addEventListener('click', () => { cambiarCantidad(Number(btn.dataset.id), 1); actualizarQtyDisplay(Number(btn.dataset.id)); });
  });
  grid.querySelectorAll('.btn-restar').forEach(btn => {
    btn.addEventListener('click', () => { cambiarCantidad(Number(btn.dataset.id), -1); actualizarQtyDisplay(Number(btn.dataset.id)); });
  });
}

function actualizarQtyDisplay(id) {
  const el = document.getElementById(`qty-${id}`);
  if (!el) return;
  const item = obtenerCarrito().find(i => i.id === id);
  el.textContent = item ? item.cantidad : 0;
}

function renderPaginacion(total, actual, el) {
  el.innerHTML = '';
  for (let i = 1; i <= total; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === actual) btn.classList.add('active');
    btn.addEventListener('click', () => cargarProductos(i, categoriaActual));
    el.appendChild(btn);
  }
}

function seleccionarCategoria(cat) {
  categoriaActual = cat;
  document.querySelectorAll('.btn-categoria').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  cargarProductos(1, cat);
}

document.querySelector('.btn-categoria[data-cat=""]')?.addEventListener('click', () => seleccionarCategoria(''));

cargarProductos();
