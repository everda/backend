const ContenedorMongo = require('../../contenedores/ContenedorMongo')

const { productSchema } = require('../../schemas/productSchema');

class ProductoDaoMongo extends ContenedorMongo {
    constructor() {
        super(productSchema, 'productsCollection');
    }

    async getProducts() {
        try {
            await  this.connect();
            let response = await this.model.find({});
            await  this.disconnect();
            return response;

        }

        catch (error) {
            console.log(error)
        }

    }

    async getProduct(id) {
        try {
            await    this.connect();
            let response = await this.model.findOne({ id: id });
            await   this.disconnect();
            return response;

        }
        catch (error) {
            console.log(error)
        }
    }

    async createProduct(product) {
        try {
            await    this.connect();
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            //console.log(product)
            let response = await this.model.create({ id: id,  ...product });
            await   this.disconnect();
            return response;
        }
        catch (error) {
            console.log(error)
        }
    }


    async updateProduct(id, product) {
        try {
            await   this.connect();
            let response = await this.model.findOneAndUpdate({ id: id }, product);
            await  this.disconnect();
            return response;
        }
        catch (error) {
            console.log(error)
        }

    }

    async deleteProduct(id) {
        try {
            await this.connect();
            let response = await this.model.findOneAndDelete({ id });
            await this.disconnect();
            return response;
        }
        catch (error) {
            console.log(error)
        }

    }
}


module.exports = ProductoDaoMongo;