import bcrypt from 'bcrypt';
import { Usuario } from '../models/index.js';

const mostrarLogin = (req, res) => {
  res.render('login', { error: null });
};

const procesarLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !usuario.es_admin) {
      return res.render('login', { error: 'Credenciales inválidas.' });
    }
    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.render('login', { error: 'Credenciales inválidas.' });
    }
    req.session.usuario = { id: usuario.id, nombre: usuario.nombre, es_admin: usuario.es_admin };
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.render('login', { error: 'Error del servidor.' });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
};

export { mostrarLogin, procesarLogin, logout };
