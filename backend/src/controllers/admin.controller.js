import { Producto } from '../models/index.js';

const mostrarDashboard = async (req, res) => {
  try {
    const productos = await Producto.findAll({ order: [['categoria', 'ASC'], ['nombre', 'ASC']] });
    res.render('dashboard', { productos, usuario: req.session.usuario });
  } catch (error) {
    res.status(500).send('Error al cargar el dashboard.');
  }
};

const mostrarAlta = (req, res) => {
  res.render('alta', { producto: null, error: null, usuario: req.session.usuario });
};

const mostrarEditar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.redirect('/admin/dashboard');
    res.render('alta', { producto, error: null, usuario: req.session.usuario });
  } catch (error) {
    res.redirect('/admin/dashboard');
  }
};

const guardarProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    await Producto.create({ nombre, precio, stock, categoria, imagen });
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.render('alta', { producto: null, error: 'Error al guardar el producto.', usuario: req.session.usuario });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.redirect('/admin/dashboard');
    const { nombre, precio, stock, categoria } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : producto.imagen;
    await producto.update({ nombre, precio, stock, categoria, imagen });
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.redirect('/admin/dashboard');
  }
};

const toggleActivo = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) await producto.update({ activo: !producto.activo });
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.redirect('/admin/dashboard');
  }
};

export { mostrarDashboard, mostrarAlta, mostrarEditar, guardarProducto, actualizarProducto, toggleActivo };
