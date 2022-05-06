const ContenedorMongo = require('./../../contenedores/ContenedorMongo');
const { mongoConnect, mongoose } = require('../../../config/databases');
const { cartSchema } = require('../../schemas/cartSchema');

class CarritoDaoMongo extends ContenedorMongo {

    constructor() {
        super(cartSchema, 'cartCollection');
    }

    async getCartId(cid) {
        try {
            let response = await this.model.find({ cid });
            return response;
        }
        catch (error) {
            console.log(error)
        }
    }
    async createCart() {
        try {
            let cart = [];
            let data = await this.getData();
            if (data.length > 0) {
                cart = JSON.parse(data);
            }
            let id = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;
            let newCart = {
                id: id,
                products: []
            }
            cart.push(newCart);
            let response = await this.model.insertOne(cart);

            return response;
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = CarritoDaoMongo;