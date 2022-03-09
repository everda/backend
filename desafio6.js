import fs from 'fs';

class Archivo {
    constructor(nombreArchivo) { this.nombreArchivo = nombreArchivo }

    leer = async () => {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                let content = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
                console.log(content)
            } else {
                console.log([])
            }
        } catch (error) {
            console.log(error);

        }
    }

    guardar = async (content) => {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                let oldObject = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'));
                let id = oldObject[oldObject.length - 1].id + 1;
                let newRecord = { id: id, ...content };
                let newContent = [...oldObject, newRecord];
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newContent, null, '\t'), 'utf-8');
            } else {
                let id = 1;
                let newRecord = [{ id: id, ...content }];
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newRecord, null, '\t'), 'utf-8');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    borrar = async () => {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                await fs.promises.unlink(this.nombreArchivo);
            } else {
                console.log('No existe el archivo')
            }
        }
        catch (error) {
            console.log(error);

        }
    }
}


let archivo = new Archivo('productos.txt');

const procesar = async () => {
    try {
        await archivo.guardar({ title: "Producto 1", price: (Math.random() * 10000).toFixed(2), thumbnail: "Foto 1" });
        await archivo.guardar({ title: "Producto 2", price: (Math.random() * 10000).toFixed(2), thumbnail: "Foto 2" });
        await archivo.guardar({ title: "Producto 3", price: (Math.random() * 10000).toFixed(2), thumbnail: "Foto 3" });
        await archivo.leer();
        await archivo.borrar();
    }
    catch (error) {
        console.log(error);
    }

}

procesar()

