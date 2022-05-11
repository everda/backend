const productModel =require('../src/models/productTest.js')

let products = new productModel();

const getPorudctsTest = async (req, res) => {
    try {
        let products = await products.getTestProducts(10);
        res.status(200).send({
            message: 'Productos',
            products: products
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error',
            description: error
        });
    }
}

module.exports = {
    getPorudctsTest
}
