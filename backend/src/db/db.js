import mongoose from 'mongoose';

export const url ="mongodb+srv://aprendeTactil:aprendetactil2024@cluster0.sq4zo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

(async ()=>{
    try{
        const db = await mongoose.connect(url,{
            
        })
        console.log('conexion a la base de datos exitosamente')
    }catch(error){
        console.log(error)
    }
})();

export default {mongoose};