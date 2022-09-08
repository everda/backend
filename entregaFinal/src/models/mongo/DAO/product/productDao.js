//const faker = require('faker');

const MongoModel = require('../mongoDAO');
const { productSchema } = require('./productSchema');

class productDao extends MongoModel {
    constructor() {
        super(productSchema, 'productsCollection');
    }


    async getProducts() {
        try {
            let response = await this.model.find({}).lean();
            return response;

        } catch (error) {
            return { status: "error", error: error }
        }

    }

    async getProduct(id) {
        try {

            let response = await this.model.findOne({ id: id });
            return response
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async createProduct(product) {
        try {
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            let response = await this.model.create({ id: id, ...product });

            return response;
        } catch (error) {
            return { status: "error", error: error }
        }
    }


    async updateProduct(id, product) {
        try {
            await this.model.findOneAndUpdate({ id: id }, product);
            let response = this.getProduct(id)
            return response;
        } catch (error) {
            return { status: "error", error: error }
        }

    }

    async deleteProduct(id) {
        try {
            let response = await this.model.findOneAndDelete({ id });
            return response;
        } catch (error) {
            return { status: "error", error: error }
        }

    }
}


module.exports = new productDao()