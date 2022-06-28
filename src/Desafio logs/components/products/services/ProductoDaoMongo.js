const ContenedorMongo = require('../../../models/mongoModel')
const faker = require('faker');
const winston = require('../../../utils/loggers/winston')

const { productSchema } = require('../Schema/productSchema');

class ProductoDaoMongo extends ContenedorMongo {
    constructor() {
        super(productSchema, 'productsCollection');
    }


    async getTestProducts(quantity) {
        try {
            let productArray = [];
            //console.log(faker.commerce.productName())
            for (let i = 0; i < quantity; i++) {
                let product = {
                    id: i,
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    image: faker.image.image()
                }
                productArray.push(product);
            }
            return productArray;

        } catch (error) {
            winston.errorLogger.error(error)
        }
    }



    async getProducts() {
        try {
            let response = await this.model.find({});
            return response;

        } catch (error) {
            winston.errorLogger.error(error)
        }

    }

    async getProduct(id) {
        try {

            let response = await this.model.findOne({ id: id });
            if (response === null) {
                return ('Producto inexistente');
            } else {
                return response;
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async createProduct(product) {
        try {
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            let response = await this.model.create({ id: id, ...product });

            return response;
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


    async updateProduct(id, product) {
        try {
            let response = await this.model.findOneAndUpdate({ id: id }, product);
            return response;
        } catch (error) {
            winston.errorLogger.error(error)
        }

    }

    async deleteProduct(id) {
        try {
            let response = await this.model.findOneAndDelete({ id });
            return response;
        } catch (error) {
            winston.errorLogger.error(error)
        }

    }
}


module.exports = ProductoDaoMongo;