import multer, { diskStorage } from "multer";

const guardar = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        if (file) { // Asegúrate de que file esté definido
            const ext = file.originalname.split('.').pop();
            cb(null, `${Date.now()}.${ext}`);
        } else {
            cb(new Error('File is not defined'));
        }
    }
});

export const subirPdf = multer({ storage: guardar });