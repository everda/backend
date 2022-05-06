const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')
const { config } = require('../../../config')

class ProductoDaoArchivo extends ContenedorArchivo {
    constructor() {
        //console.log(config.productFile)
        super(config.paths.productFile)
    }

    async getProducts() {
        try {
            let products = JSON.parse(await this.getData());
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProduct(id) {
        try {
            let products = JSON.parse(await this.getData());
            let product = products.find(product => product.id === id);
            if (!product) {
                return ('Producto inexistente');
            } else {
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async createProduct(product) {
        try {
            let products = []
            let data = await this.getData();
            
            if (data.length > 0) {
                 products = JSON.parse(data);
            } 
            
            let { title, description, code, thumbnail, price, stock } = product;
            if (title === undefined || description === undefined || code === undefined || thumbnail === undefined || price === undefined || stock === undefined) {
                return ('Faltan datos');
            }
            let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            let newProduct = {
                id: id,
                title: title,
                description: description,
                code: code,
                thumbnail: thumbnail,
                price: price,
                stock: stock
            }
            products.push(newProduct);
            let result = await this.saveData(products);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async updateProduct(id, product) {
        try {
            let products = JSON.parse(await this.getData());
            let productId = products.find(product => product.id === id);
            if (!productId) {
                return ('Producto inexistente');
            } else {

                let { title, description, code, thumbnail, price, stock } = product;
                if (title === undefined || description === undefined || code === undefined || thumbnail === undefined || price === undefined || stock === undefined) {
                    return ('Faltan datos');
                }
                productId.title = title;
                productId.description = description;
                productId.code = code;
                productId.thumbnail = thumbnail;
                productId.price = price;
                productId.stock = stock;
                let result = await this.saveData(products);
                return result;
            }

        } catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id) {
        try {
            let products = JSON.parse(await this.getData());
            let productId = products.find(product => product.id === id);
            if (!productId) {
                return ('Producto inexistente');
            } else {
                products = products.filter(product => product.id !== id);
                let result = await this.saveData(products);
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductoDaoArchivo;