import { Router } from 'express';
import { crearAdmin } from '../controllers/usuario.controller.js';
import { validarUsuario } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/admin', validarUsuario, crearAdmin);

export default router;
