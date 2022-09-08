const MongoModel = require('../mongoDAO');
const { cartSchema } = require('./cartSchema');

class CartDao extends MongoModel {
    constructor() {
        super(cartSchema, 'cartCollection');

    }

    async getCart(cid) {
        try {
            console.log(cid);
            let response = await this.model.findOne({ id: cid });
            return response;
        }
        catch (error) {
            //console.log(error)

            return { status: "error", error: error }
        }
    }

    async createCart() {
        try {
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            let response = await this.model.create({ id: id, timestamp: Date.now(), products: [] });
            return response

        }
        catch (error) {
            //console.log(error)

            return { status: "error", error: error }
        }
    }

    async deleteCart(id) {
        try {
            let response = await this.model.findOneAndDelete({ id });

            //console.log(asd);
            return response

        }
        catch (error) {
            //console.log(error)

            return { status: "error", error: error }

        }
    }

    async updateCart(id, products) {
        try {
            let response = await this.model.findOneAndUpdate({ id: id }, { products: products });
            return response

        } catch (error) {

            return { status: "error", error: error }
        }
    }
}


module.exports = new CartDao();
