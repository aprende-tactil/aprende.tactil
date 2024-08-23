import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from './db/db.js'
import { rutaPdf } from './routes/cargar.routes.js';
import { authRouter } from './routes/auth.routes.js';

const app = express();


//aplicacion de middlewares
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(cors());
app.use(express.json());

//rutas
app.use('/api/',rutaPdf)
app.use('/api/',authRouter);

//confifuracion del puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`el servidor esta corriendo en el puerto ${PORT}`)
});