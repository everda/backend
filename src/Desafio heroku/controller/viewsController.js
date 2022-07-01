
const productController = require('../components/products/controller/productController')
let numCPUs = require('os').cpus().length;
const parseArgs = require('minimist')
const args = parseArgs(process.argv.slice(2))
const winston = require('../utils/loggers/winston')



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
        let products = await productController.getPorudctsTest()
        res.render('home.handlebars', { username: req.user, title: 'home', products: products })
    } catch (error) {
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


module.exports = {
    getLoginPage,
    getRegisterPage,
    getHomePage,
    getErrorLoginPage, getLogOutPage, getErrorRegisterPage, getChatPage, getInfoPage

}