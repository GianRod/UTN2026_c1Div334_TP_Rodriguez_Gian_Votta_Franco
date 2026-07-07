import 'dotenv/config';
import bcrypt from 'bcrypt';
import app from './app.js';
import { syncDB } from './src/models/index.js';
import Usuario from './src/models/Usuario.js';
import { seedProductos } from "./src/infraestructura/seedProducts.js";

const PORT = process.env.PORT || 3000;

const crearUsuarioAdmin = async () => {
  const email = 'admin@admin.com';
  const password = 'admin123';

  const existente = await Usuario.findOne({ where: { email } });
  if (existente) {
    if (!existente.es_admin || !(await bcrypt.compare(password, existente.password))) {
      const hash = await bcrypt.hash(password, 10);
      await existente.update({ password: hash, es_admin: true, nombre: 'Admin' });
    }
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  await Usuario.create({
    nombre: 'Admin',
    email,
    password: hash,
    es_admin: true,
  });
};

syncDB().then(async () => {
  await crearUsuarioAdmin();
  await seedProducts();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/productos`);
    console.log(`Admin: http://localhost:${PORT}/admin/login`);
  });
});
