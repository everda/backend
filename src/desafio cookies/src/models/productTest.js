const faker = require('faker');

class ProductTest {
    constructor() {

    }
    async getTestProducts(quantity) {
        let productArray = [];
        console.log(faker.commerce.productName())
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
    }
}

module.exports = ProductTest;
