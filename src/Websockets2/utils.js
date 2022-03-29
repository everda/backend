import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url)


const __dirname = dirname(__filename);




let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({ storage: storage });

export default __dirname;

