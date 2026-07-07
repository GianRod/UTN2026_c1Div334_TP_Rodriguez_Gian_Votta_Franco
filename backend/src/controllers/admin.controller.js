import bcrypt from 'bcrypt';
import { Producto, Usuario } from '../models/index.js';

const CATEGORIAS_PRODUCTO = ['Ropa', 'Accesorio'];

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
    if (!CATEGORIAS_PRODUCTO.includes(categoria)) {
      return res.render('alta', {
        producto: null,
        error: 'Selecciona una categoria valida.',
        usuario: req.session.usuario,
      });
    }

    if (!req.file) {
      return res.render('alta', {
        producto: null,
        error: 'La imagen del producto es obligatoria.',
        usuario: req.session.usuario,
      });
    }

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
    if (!CATEGORIAS_PRODUCTO.includes(categoria)) {
      return res.render('alta', {
        producto,
        error: 'Selecciona una categoria valida.',
        usuario: req.session.usuario,
      });
    }

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

const mostrarAltaUsuario = (req, res) => {
  res.render('altaUsuario', { error: null, usuario: req.session.usuario });
};

const guardarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, es_admin } = req.body;

    if (!nombre || !email || !password) {
      return res.render('altaUsuario', {
        error: 'Nombre, email y password son requeridos.',
        usuario: req.session.usuario,
      });
    }

    const hash = await bcrypt.hash(password, 10);
    await Usuario.create({
      nombre,
      email,
      password: hash,
      es_admin: es_admin === 'on' ? 1 : 0,
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    const mensaje = error.name === 'SequelizeUniqueConstraintError'
      ? 'El email ya esta registrado.'
      : 'Error al crear el usuario.';

    res.render('altaUsuario', { error: mensaje, usuario: req.session.usuario });
  }
};

export {
  mostrarDashboard,
  mostrarAlta,
  mostrarEditar,
  guardarProducto,
  actualizarProducto,
  toggleActivo,
  mostrarAltaUsuario,
  guardarUsuario,
};
