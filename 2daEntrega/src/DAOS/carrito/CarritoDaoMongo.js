const ContenedorMongo = require('./../../contenedores/ContenedorMongo');

const { cartSchema } = require('../../schemas/cartSchema');

class CarritoDaoMongo extends ContenedorMongo {
    constructor() {
        super(cartSchema, 'cartCollection');
        console.log(this.model);
    }

    async getCart(cid) {
        try {
            let response = await this.model.findOne({ id: cid });
            if (response === null) {
                return 'Carro inexistente';
            } else {

                return response;
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async createCart() {
        try {
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            await this.model.create({ id: id, timestamp: Date.now(), products: [] });

        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteCart(id) {
        try {
            await this.model.findOneAndDelete({ id });
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
                let productId = products.find(prod => prod.id === product.id);
                if (productId) {
                    productId.quantity += 1;
                } else {
                    products.push({ id: product.id, timestamp: Date.now(), quantity: 1 });
                }
                await this.model.findOneAndUpdate({ id: id }, { products: products });

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
                await this.model.findOneAndUpdate({ id: id }, { products: products });

            }
        }
        catch (error) {
            console.log(error)
        }
    }


}


module.exports = CarritoDaoMongo;
