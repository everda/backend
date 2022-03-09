import fs from 'fs';

//fs.writeFileSync('primerArchivo.txt', 'Hola mundo');



if (fs.existsSync('primerArchivo.txt')) {
    let content = fs.readFileSync('primerArchivo.txt', 'utf-8');
    console.log(content)
} else {
    console.log('No existe el archivo')
    fs.writeFileSync('primerArchivo.txt', 'Hola mundo');
}

