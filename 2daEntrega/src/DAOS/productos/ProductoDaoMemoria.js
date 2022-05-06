const ContenedorMemoria = require('../../contenedores/ContenedorMemoria')

class ProductoDaoMemoria extends ContenedorMemoria {
    constructor() {
        super()
    }

    getProducts() {
        let products = this.getData();
        return products;
    }

    getProduct(id) {
        let products = this.getData();
        let product = products.find(product => product.id === id);
        if (!product) {
            return ('Producto inexistente');
        } else {
            return product;
        }
    }
    createProduct(product) {

        let products = []
        let data = this.getData();

        if (data.length > 0) {
            products = data;
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
        let result = this.saveData(products);
        return result;

    }
    updateProduct(id, product) {

        let products = this.getData();
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
            let result =  this.saveData(products);
            return result;
        }


    }
    deleteProduct(id) {

        let products = this.getData();
        let productId = products.find(product => product.id === id);
        if (!productId) {
            return ('Producto inexistente');
        } else {
            products = products.filter(product => product.id !== id);
            let result = this.saveData(products);
            return result;
        }

    }
}

module.exports = ProductoDaoMemoria;