import {Schema,model} from 'mongoose';

const libro = new Schema({
    titulo:{
        type:String,
        required:true,
        trim:true
    },
    pdf :{
        type:String,
        required:true,
        trim:true
    },
    categoria:{
        type:String,
        required:true,
        trim:true
    },
    anio:{
        type:String,
        required:true
    }
})
export default  model('libro',libro)