import { Router } from 'express';
import * as ctrl from '../controllers/venta.controller.js';
import { validarVenta } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/', validarVenta, ctrl.registrarVenta);
router.get('/', ctrl.listarVentas);
router.get('/exportar/excel', ctrl.descargarExcel);

export default router;
