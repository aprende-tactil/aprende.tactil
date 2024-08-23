import jwt from 'jsonwebtoken';
import user from '../models/user.model';

export const validarJWT = async(token)=>{
    try{
        const {id} = jwt.verify(token,'mysecret');
        const usuario  = await user.findById(id);
        if(!usuario){
            return false;
        }else{
            return usuario;
        }
    }catch(error){
        console.log(error)
    }
}