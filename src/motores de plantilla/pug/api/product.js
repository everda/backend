export default class Producto {
    constructor() {
        this.products = [];
    }

    createProduct(id, name, price, thumbnail) {
        this.products.push({
            id,
            name,
            price,
            thumbnail
        });
    }

    getProducts() {
        return this.products;
    }
    getProduct(id) {
        let item = this.products.find(item => parseInt(item.id) === parseInt(id));
        return item;
    }


}