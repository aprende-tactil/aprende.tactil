import {Schema,model} from 'mongoose';

const libros = new Schema({
    libro :{
        type:Stringm,
        required:true,
        trim:true
    },
    categoria:{
        type:String,
        required:true,
        trim:true
    },
    añoLectivo:{
        type:Number,
        required:true
    }
})
export default  model('libros',libros)