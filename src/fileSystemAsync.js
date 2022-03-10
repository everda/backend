import fs from 'fs';

//fs.writeFileSync('primerArchivo.txt', 'Hola mundo');




     fs.readFile('primerArchivo.txt', 'utf-8', (err, data) => {
        if (err) return console.log(err) 
        console.log(data)
    });


    // console.log('No existe el archivo')
    // fs.writeFile('primerArchivo.txt', 'Hola mundo', (err) => {
    //     if (err) return console.log(err);
    //     console.log('Archivo creado');
    // });


