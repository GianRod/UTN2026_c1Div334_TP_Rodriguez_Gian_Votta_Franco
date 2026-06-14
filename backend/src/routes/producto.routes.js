import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import * as ctrl from '../controllers/producto.controller.js';
import { validarProducto } from '../middlewares/validation.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = Router();

router.get('/', ctrl.listarTodos);
router.get('/:id', ctrl.obtenerPorId);
router.post('/', upload.single('imagen'), validarProducto, ctrl.crear);
router.put('/:id', upload.single('imagen'), validarProducto, ctrl.modificar);
router.patch('/:id/desactivar', ctrl.desactivar);
router.patch('/:id/activar', ctrl.activar);

export default router;
