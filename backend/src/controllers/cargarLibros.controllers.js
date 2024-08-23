import libro from "../models/libros.models.js";
import mongoose from 'mongoose';

export const cargarPdf = async (req,res)=>{
    try{
        const {titulo,categoria,anio}= req.body;
        let pdf = '';
        if(req.file){
            pdf= '/uploads/'+req.file.filename;
        }else{
            res.status(400).json({msg:'el archivo pdf es obligatorio'})
        }
        const newlibro = new libro({
            pdf,
            categoria,anio,titulo
        })
        await newlibro.save();
        return res.status(200).json({msg:'libro guardado correctamentrs'})

    }catch(error){
        console.log(error)
    }
}

//obtener pdf
export const obtPdf = async(req,res)=>{
    try{
        const {categoria} = req.params
        const obtPdf = await libro.find({categoria:categoria})
        res.status(200).json(obtPdf);
    }catch(error){
        console.log(error)
    }
}