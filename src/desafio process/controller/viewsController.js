const { async } = require("rxjs");
const productController = require('../components/products/controller/productController')
const parseArgs = require('minimist')
const args = parseArgs(process.argv.slice(2))



let getLoginPage = async (req, res) => {
    try {
        res.render('login.handlebars', { title: 'Login Ecommerce' })
    } catch (error) {
        console.log(error);
    }

}


let getRegisterPage = async (req, res) => {
    try {
        res.render('register.handlebars', { title: 'Register Ecommerce' })
    } catch (error) {
        console.log(error);
    }
}


let getHomePage = async (req, res) => {
    try {
        let products = await productController.getPorudctsTest()
        res.render('home.handlebars', { username: req.user, title: 'home', products: products })
    } catch (error) {
        console.log(error);
    }
}

let getErrorLoginPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('loginError.handlebars', { title: 'error page login' })
    } catch (error) {
        console.log(error);

    }
}

let getErrorRegisterPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('registerError.handlebars', { title: 'error page Registration' })
    } catch (error) {
        console.log(error);

    }
}

let getLogOutPage = async (req, res) => {
    try {
        res.render('logout.handlebars', { title: 'Goodbye' })
    } catch (error) {
        console.log(error);
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

const getInfoPage = async (req, res) => {
    try {
        console.log(args._);
        let data = {
            entryArguments: args._,
            platformName: process.platform,
            nodeVersion: process.version,
            rss: process.memoryUsage().rss,
            path: process.execPath,
            processId: process.pid,
            directory: process.cwd()
        }
        console.log(data);
        res.render('info.handlebars', { title: "info", data })

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getLoginPage,
    getRegisterPage,
    getHomePage,
    getErrorLoginPage, getLogOutPage, getErrorRegisterPage, getChatPage, getInfoPage

}