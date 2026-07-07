const validarProducto = (req, res, next) => {
  const { nombre, precio, stock = 0, categoria } = req.body;

  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'nombre, precio y categoria son requeridos.' });
  }

  if (isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un numero positivo.' });
  }

  if (isNaN(stock) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
    return res.status(400).json({ error: 'El stock debe ser un numero entero mayor o igual a cero.' });
  }

  next();
};

const validarVenta = (req, res, next) => {
  const { nombre_usuario, productos } = req.body;

  if (!nombre_usuario || !productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'nombre_usuario y un array de productos son requeridos.' });
  }

  const itemsInvalidos = productos.some(item => (
    !item.id ||
    isNaN(item.id) ||
    isNaN(item.cantidad) ||
    Number(item.cantidad) <= 0 ||
    !Number.isInteger(Number(item.cantidad))
  ));

  if (itemsInvalidos) {
    return res.status(400).json({ error: 'Cada producto debe incluir id y cantidad entera positiva.' });
  }

  next();
};

export { validarProducto, validarVenta };
