const productModel = require('../src/models/productTest.js')
const messagesModel = require('../src/models/messageModelMongo.js')

let products = new productModel();

const getHomePage = async (req, res) => {
    try {
        res.render("home.handlebars");
    } catch (error) {
        res.status(500).send({
            message: 'Error',
            description: error
 
        });
    }
}

const getProductsTest = async (req, res) => {
    try {
        let productsArray = await products.getTestProducts(10);

        res.render("productsTest.handlebars", { "products": productsArray });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error',
            description: error
        });
    }
}

const getChatPage = async (req, res) => {
    try {
        //let messages = await messagesModel.getMessages();
        res.render("chat.handlebars");
    } catch (error) {
        res.status(500).send({
            message: 'Error',
            description: error
        });
    }
}


module.exports = {
    getHomePage,
    getProductsTest,
    getChatPage
}

