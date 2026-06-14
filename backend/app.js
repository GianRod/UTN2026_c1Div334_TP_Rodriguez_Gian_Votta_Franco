import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import productoRoutes from './src/routes/producto.routes.js';
import ventaRoutes from './src/routes/venta.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import adminRoutes from './src/routes/admin.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto',
  resave: false,
  saveUninitialized: false,
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/admin.css', express.static(path.join(__dirname, 'public/admin.css')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/admin', authRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.redirect('/admin/login'));

export default app;
