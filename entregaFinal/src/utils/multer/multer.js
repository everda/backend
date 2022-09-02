let multer = require('multer');
//let { __dirname } = require('../utils')

//let __filename = fileURLToPath(import.meta.url)
//let __dirname = dirname(__filename);

const path = require('path');
const dirPath = path.join(process.cwd(), '/src/public/img');


let storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
}


