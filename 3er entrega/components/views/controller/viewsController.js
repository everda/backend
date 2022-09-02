
const productModel = require('../../products/services/ProductoDao')
const cartModel = require('../../cart/services/CarritoDao')
let numCPUs = require('os').cpus().length;
const parseArgs = require('minimist')
const args = parseArgs(process.argv.slice(2))
const winston = require('../../../utils/loggers/winston');
const userInstance = require('../../login/services/userService')


let getLoginPage = async (req, res) => {
    try {
        res.render('login.handlebars', { title: 'Login Ecommerce' })
    } catch (error) {
        winston.errorLogger.error(error)
    }

}


let getRegisterPage = async (req, res) => {
    try {
        res.render('register.handlebars', { title: 'Register Ecommerce' })
    } catch (error) {
        winston.errorLogger.error(error)
    }
}


let getHomePage = async (req, res) => {
    try {
        let products = await productModel.getProducts()
        let user = await userInstance.getUsernameData(req.user)
        console.log(products);
        if (user) {
            res.render('home.handlebars', {
                username: req.user,
                name: user.name,
                lastname: user.lastname,
                direccion: user.direccion,
                edad: user.edad,
                prefijo: user.prefijo,
                numero: user.numero,
                foto: user.foto,
                title: 'home',
                products: products,
            })
        }
        else  {
            res.render('loginError.handlebars') 
        }
    } catch (error) {
        console.log(error);
        winston.errorLogger.error(error)
    }
}



let getErrorLoginPage = async (req, res) => {
    try {

        res.render('loginError.handlebars', { title: 'error page login' })
    } catch (error) {
        winston.errorLogger.error(error)

    }
}

let getErrorRegisterPage = async (req, res) => {
    try {

        res.render('registerError.handlebars', { title: 'error page Registration' })
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let getLogOutPage = async (req, res) => {
    try {
        res.render('logout.handlebars', { title: 'Goodbye' })
    } catch (error) {
        winston.errorLogger.error(error)
    }
}


const getChatPage = async (req, res) => {
    try {
        //let messages = await messagesModel.getMessages();
        res.render("chat.handlebars");
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

const getInfoPage = async (req, res) => {
    try {
        console.log("prueba")
        let data = {
            entryArguments: args._,
            platformName: process.platform,
            nodeVersion: process.version,
            rss: process.memoryUsage().rss,
            path: process.execPath,
            processId: process.pid,
            directory: process.cwd(),
            cpus: numCPUs
        }

        res.send(JSON.stringify(data))

    } catch (error) {
        //console.log(error);
        winston.errorLogger.error(error.message)
    }
}



let getCartPage = async (req, res) => {
    try {
        let cartId = req.params.cid
        let cart = await cartModel.getCart(cartId)
        let cartProducts = cart.products
        //console.log(cartProducts);

        let products = await Promise.all(cartProducts.map(async (e) => {

            let { id, quantity } = e
            let { title, description, code, thumbnail, price, stock } = await productModel.getProduct(id)
            let product = { id, title, description, code, thumbnail, price, stock, quantity }
            return product

        }))

        res.render("cart.handlebars", { username: req.user, title: 'cart', products: products })


    } catch (error) {

        winston.errorLogger.error(error)

    }

}


let getCartConfirmationPage = (req, res) => {
    try {
        res.render("cartConfirmation.handlebars", { username: req.user, title: 'cartConfirmation' })
    } catch (error) {

        winston.errorLogger.error(error)
    }
}


module.exports = {
    getLoginPage,
    getRegisterPage,
    getHomePage,
    getErrorLoginPage,
    getLogOutPage,
    getErrorRegisterPage,
    getChatPage,
    getInfoPage,
    getCartPage, getCartConfirmationPage

}