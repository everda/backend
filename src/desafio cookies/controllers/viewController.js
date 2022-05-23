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
        if (req.session.name) {
            console.log("entre a sesion iniciada")
            console.log(req.session.name)
            let data = {
                "user": req.session.name,
                "logs": false
            }

            //let messages = await messagesModel.getMessages();
            res.render("chat.handlebars", { data: data });
        } else {
            console.log("entre por aca")
            let data = {
                "user": "",
                "logs": true
            }
            res.render("chat.handlebars", { data: data });
        }

    } catch (error) {
        res.status(500).send({
            message: 'Error',
            description: error
        });
    }
}

const getLogoutPage = async (req, res) => {
    try {
        
        res.render("logout.handlebars", { user: req.session.name });
        
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
    getChatPage, getLogoutPage
}

