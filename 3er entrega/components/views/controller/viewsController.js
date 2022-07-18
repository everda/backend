const winston = require('../../../utils/loggers/winston')


let getLoginPage = async (req, res) => {
    try {
        res.render('login.handlebars', {title: 'Login Ecommerce'})
    } catch (error) {
        winston.errorLogger.error(error)
    }

}


let getRegisterPage = async (req, res) => {
    try {
        res.render('register.handlebars', {title: 'Register Ecommerce'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}


let getHomePage = async (req, res) => {
    try {
        console.log("entre a home");
        console.log(req);
        res.render('home.handlebars', {username: req.user , title:'home'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let getErrorLoginPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('loginError.handlebars', {title: 'error page login'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let getErrorRegisterPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('registerError.handlebars', {title: 'error page Registration'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let getLogOutPage = async (req, res) => {
    try {
        res.render('logout.handlebars', {title: 'Goodbye'})
    } catch (error) {
        winston.errorLogger.error(error)
    }
}


module.exports = {
    getLoginPage,
    getRegisterPage,
    getHomePage,
    getErrorLoginPage, getLogOutPage, getErrorRegisterPage

}