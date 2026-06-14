import { Router } from 'express';
import { crearAdmin } from '../controllers/usuario.controller.js';

const router = Router();

router.post('/admin', crearAdmin);

export default router;
