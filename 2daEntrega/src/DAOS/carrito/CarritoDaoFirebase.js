const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');

const { cartSchema } = require('../../schemas/cartSchema');

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(cartSchema, 'cartCollection');
    }

    async getCart(cid) {
        try {
            let response = await this.model.findOne({ id: cid });
            return response;
        }
        catch (error) {
            console.log(error)
        }
    }

    async createCart() {
        try {
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            let response = await this.model.create({ id: id, timestamp: Date.now(), products: [] });
            return response;
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteCart(id) {
        try {
            let response = await this.model.findOneAndDelete({ id });
            return response;

        }
        catch (error) {
            console.log(error)
        }
    }

    async addProduct(id, product) {
        try {
            let cart = await this.getCart(id);
            if (!cart) {
                return 'Carro inexistente';
            } else {
                let products = cart.products;
                console.log("1")
                console.log(cart)
                let productId = products.find(prod => prod.id === product.id);
                if (productId) {
                    productId.quantity += 1;
                } else {
                    products.push({ id: product.id, timestamp: Date.now(), quantity: 1 });
                }
                let response = await this.model.findOneAndUpdate({ id: id }, { products: products });
                return cart;
            }
        }
        catch (error) {
            console.log(error)
        }



    }

    async removeProduct(id, product) {
        try {
            let cart = await this.getCart(id);
            if (!cart) {
                return 'Carro inexistente';
            } else {
                let products = cart.products;
                let productId = products.find(prod => prod.id === product);
                if (productId) {
                    if (productId.quantity > 1) {
                        productId.quantity -= 1;
                    } else {
                        products = products.filter(prod => prod.id !== product);
                    }
                }
                let response = await this.model.findOneAndUpdate({ id: id }, { products: products });
                return cart;
            }
        }
        catch (error) {
            console.log(error)
        }
    }


}


module.exports = CarritoDaoFirebase;
