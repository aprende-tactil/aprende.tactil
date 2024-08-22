import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from './db/db.js'
import { rutaPdf } from './routes/cargar.routes.js';

const app = express();


//aplicacion de middlewares
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(cors());

//rutas
app.use('/api/',rutaPdf)

//confifuracion del puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`el servidor esta corriendo en el puerto ${PORT}`)
});