import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from './db/db.js'

const app = express();

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(cors());


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`el servidor esta corriendo en el puerto ${PORT}`)
});