import fs from 'fs';


export default class Products {  // Clase Producto
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    getProducts = async () => {
        try {


            if (fs.existsSync(this.nombreArchivo)) {
                let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
                return content;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    saveProducts = async (cart) => {
        try {
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(cart, null, '\t'), 'utf-8');
            return true;
        } catch (error) {
            console.log(error);
        }

    }

    getProductById = async (id) => {
        try {
            let products = JSON.parse(await this.getProducts());
            let product = products.find(product => product.id == id);
            console.log(product)
            if (id === undefined) {
                throw new Error('Faltan datos');
            } else {
                if (!product) {
                    throw new Error('Producto inexistente');
                } else {
                    return product;
                }
            }
        }
        catch (error) {
            console.log(error);
        }


    }
}


    // createProduct = async (product) => {
    //     try {
    //         if (fs.existsSync(this.nombreArchivo)) {
    //             let oldObject = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'));
    //             let id = oldObject[oldObject.length - 1].id + 1;
    //             let newRecord = { id: id, timestamp: Date.now(), ...product };
    //             let newProduct = [...oldObject, newRecord];
    //             await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newProduct, null, '\t'), 'utf-8');
    //             console.log("archivo ya existia" + this.nombreArchivo);
    //             console.log(oldObject);
    //         } else {
    //             let id = 1;
    //             let newProduct = [{ id: id, timestamp: Date.now(), ...product }];
    //             await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newProduct, null, '\t'), 'utf-8');
    //             console.log("archivo creado" + this.nombreArchivo);
    //         }

    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }



    // getProducts = async () => {
    //     try {
    //         if (fs.existsSync(this.nombreArchivo)) {
    //             let content = await fs.promises.readFile(this.nombreArchivo, 'utf-8');

    //             return content;

    //         } else {
    //             return [];
    //         }
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    // getProductbyId = async (id) => {
    //     try {
    //         if (fs.existsSync(this.nombreArchivo)) {
    //             let content = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
    //             let product = JSON.parse(content).find(product => product.id == id);
    //             return product;
    //         } else {
    //             return [];
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // updateProduct = async (id, product) => {
    //     try {
    //         if (fs.existsSync(this.nombreArchivo)) {
    //             let content = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
    //             let index = content.findIndex(x => x.id == id);
    //             content[index] = product;
    //             await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8');
    //         } else {
    //             return [];
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // deleteProduct = async (id) => {
    //     try {
    //         if (fs.existsSync(this.nombreArchivo)) {
    //             let content = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
    //             let index = content.findIndex(x => x.id == id);
    //             content.splice(index, 1);
    //             await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8');
    //         } else {
    //             return [];
    //         }
    //     } catch (error) {
    //         console.log(error);

    //     }





    // }
