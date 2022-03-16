export class Producto {
    constructor() {
        this.products = [];
    }

    createProduct(id, title, price, thumbnail) {
        this.products.push({
            id,
            title,
            price,
            thumbnail
        });
    }

    getProducts() {
        return this.products;
    }
    getProduct(id) {
        let item = this.products.find(item => item.id === id);
        return item;
    }


}