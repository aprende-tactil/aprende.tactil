import {cargarPdf, obtPdf} from '../controllers/cargarLibros.controllers.js';
import { subirPdf } from '../../middlewares/storage.js';
import {Router} from 'express';

export const rutaPdf = Router();

rutaPdf.post('/cargar',subirPdf.single('pdf'),cargarPdf);
rutaPdf.get('/obtener/:categoria',obtPdf);

