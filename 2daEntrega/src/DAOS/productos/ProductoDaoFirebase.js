const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

const { productSchema } = require('../../schemas/productSchema');

class ProductoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(productSchema, 'productsCollection');
    }

    async getProducts() {
        try {
            let response = await this.model.find({});
            return response;

        }

        catch (error) {
            console.log(error)
        }

    }

    async getProduct(id) {
        try {
            
            let response = await this.model.findOne({ id: id });
            return response;

        }
        catch (error) {
            console.log(error)
        }
    }

    async createProduct(product) {
        try {
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            console.log(product)
            let response = await this.model.create({ id: id,  ...product });
            
            return response;
        }
        catch (error) {
            console.log(error)
        }
    }


    async updateProduct(id, product) {
        try {
            let response = await this.model.findOneAndUpdate({ id: id }, product);
            return response;
        }
        catch (error) {
            console.log(error)
        }

    }

    async deleteProduct(id) {
        try {
            let response = await this.model.findOneAndDelete({ id });
            return response;
        }
        catch (error) {
            console.log(error)
        }

    }
}


module.exports = ProductoDaoFirebase;