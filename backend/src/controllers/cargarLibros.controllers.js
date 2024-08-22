import librosModels from "../models/libros.models.js";
import mongoose from 'mongoose';

export const cargarPdf = async (req,res)=>{
    try{
        let pdf = '';
        if(req.file){
            file= '/uploads/'+req.file.filename;
        }else{
            res.status(400).json({msg:'el archivo pdf es obligatorio'})
        }
        const newlibro = new librosModels({
            libro
        })
        await newlibro.save();
        return res.status(200).json({msg:'libro guardado correctamentrs'})

    }catch(error){
        console.log(error)
    }
}