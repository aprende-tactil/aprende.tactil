import {registro,login} from '../controllers/user.controllers.js';
import { Router } from 'express';
export const authRouter = Router();

//ruta para registrarse
authRouter.post('/register', registro);

// ruta para el login.
authRouter.post('/login',login);
