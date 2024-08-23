import { Schema, model } from 'mongoose';

const user = new Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },contrasenia:{
        type: String,
        required:true,
        bcrypt:true
    },
    rol:{
        type:String,
        default:'Docente'
    }
},{
    timestamps:true
});

export default model('user',user);