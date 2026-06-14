import bcrypt from 'bcrypt';
import { Usuario } from '../models/index.js';

const crearAdmin = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash, es_admin: true });
    res.status(201).json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }
    res.status(500).json({ error: error.message });
  }
};

export { crearAdmin };
