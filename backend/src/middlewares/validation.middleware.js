const validarProducto = (req, res, next) => {
  const { nombre, precio, categoria } = req.body;
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'nombre, precio y categoria son requeridos.' });
  }
  if (isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número positivo.' });
  }
  next();
};

const validarVenta = (req, res, next) => {
  const { nombre_usuario, productos } = req.body;
  if (!nombre_usuario || !productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'nombre_usuario y un array de productos son requeridos.' });
  }
  next();
};

export { validarProducto, validarVenta };
