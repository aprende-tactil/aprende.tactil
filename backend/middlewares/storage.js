import multer,{diskStorage} from "multer";

const guardar = diskStorage({
    destination:(req,file,cd)=>{
        cb(null,'./public/uploads')
    },filename:(req,file,cb)=>{
        if(file!== null){
            const ext = file.originalname.split('.').pop()
            cb(null,Date.now()+'.'+ext)
        }
    }
})
export const subirPdf = multer({storage:guardar});