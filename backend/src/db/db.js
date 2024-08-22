import mongoose from 'mongoose';


export const url = "mongodb://localhost:27017/";

(async ()=>{
    try{
        const db = await mongoose.connect(url, {
        });
        console.log('La conexión fue exitosa');
    }catch(error){
        console.log(error)
    }
})();



export default {mongoose}
