import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url)


const __dirname = dirname(__filename);

let formatedDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `[${day}/${month}/${year} ${hours}:${minutes}:${seconds}]`;
}


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({ storage: storage });

export default { __dirname, formatedDate};



