import { Producto } from '../models/index.js';

const listarTodos = async (req, res) => {
  try {
    const { page = 1, limit = 8, categoria } = req.query;
    const offset = (page - 1) * limit;
    const where = { activo: true };
    if (categoria) where.categoria = categoria;

    const { count, rows } = await Producto.findAndCountAll({
      where,
      limit: Number(limit),
      offset: Number(offset),
    });

    res.json({
      total: count,
      pagina: Number(page),
      totalPaginas: Math.ceil(count / limit),
      productos: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crear = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    const producto = await Producto.create({ nombre, precio, stock, categoria, imagen });
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modificar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });

    const { nombre, precio, stock, categoria } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : producto.imagen;
    await producto.update({ nombre, precio, stock, categoria, imagen });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const desactivar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    await producto.update({ activo: false });
    res.json({ mensaje: 'Producto desactivado.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const activar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    await producto.update({ activo: true });
    res.json({ mensaje: 'Producto activado.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { listarTodos, obtenerPorId, crear, modificar, desactivar, activar };
