import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import * as ctrl from '../controllers/admin.controller.js';
import { descargarExcel } from '../controllers/venta.controller.js';
import { requireAdmin } from '../middlewares/auth.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = Router();

router.use(requireAdmin);

router.get('/dashboard', ctrl.mostrarDashboard);
router.get('/producto/alta', ctrl.mostrarAlta);
router.post('/producto/alta', upload.single('imagen'), ctrl.guardarProducto);
router.get('/producto/editar/:id', ctrl.mostrarEditar);
router.post('/producto/editar/:id', upload.single('imagen'), ctrl.actualizarProducto);
router.post('/producto/toggle/:id', ctrl.toggleActivo);
router.get('/usuario/alta', ctrl.mostrarAltaUsuario);
router.post('/usuario/alta', ctrl.guardarUsuario);
router.get('/ventas/excel', descargarExcel);

export default router;
