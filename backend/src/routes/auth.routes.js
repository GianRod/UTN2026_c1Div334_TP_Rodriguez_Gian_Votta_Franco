import { Router } from 'express';
import { mostrarLogin, procesarLogin, logout } from '../controllers/auth.controller.js';

const router = Router();

router.get('/login', mostrarLogin);
router.post('/login', procesarLogin);
router.get('/logout', logout);

export default router;
