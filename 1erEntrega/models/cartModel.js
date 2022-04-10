import fs from 'fs';

export default class Cart {  // Clase Producto
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    getCart = async () => {
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

    saveCart = async (cart) => {
        try {
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(cart, null, '\t'), 'utf-8');
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    getCartPrdoducts = async (id) => {
        try {
            let cart = JSON.parse(await this.getCart());
            let cartId = cart.find(cart => cart.id === id);
            if (id === undefined) {
                throw new Error('Faltan datos');
            } else {
                if (!cartId) {
                    throw new Error('Carro inexistente');
                } else {
                    return cartId.products;

                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
