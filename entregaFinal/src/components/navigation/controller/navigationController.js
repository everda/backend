const winston = require('../../../utils/loggers/winston')
const navigationService = require('../services/navigationService')
const { authSchema, authRegSchema } = require('../../../utils/validator/validationSchema')
const { generateToken, validateToken, generateRefreshToken } = require('../../../utils/JWT/jwt')



class navigationController {


    async logOutUser(req, res, next) {
        try {
            res.render('logout.handlebars', { title: 'Logout Ecommerce' })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }
    }

    async getUserInfo(req, res, next) {
        try {
            res.render('info.handlebars', { title: 'Logout Ecommerce' })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }
    }

    async loginPage(req, res, next) {
        try {

            res.render('login.handlebars', { title: 'Login Ecommerce' })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }
    }


    async registerPage(req, res, next) {
        try {
            res.render('register.handlebars', { title: 'Register Ecommerce' })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }
    }

    async homePage(req, res, next) {
        try {
            let userData = await navigationService.getUsernameInfo(req.user)
            let products = await navigationService.getProducts()
            res.render('home.handlebars', {
                username: req.user,
                name: userData.name,
                lastname: userData.lastname,
                direccion: userData.direccion,
                edad: userData.edad,
                prefijo: userData.prefijo,
                numero: userData.numero,
                foto: userData.foto,
                title: 'home',
                products: products,
            })
        } catch (error) {

            winston.errorLogger.error(error)
            next(error)
        }
    }

    async chatPage(req, res, next) {
        try {

            res.render('chat.handlebars', { title: 'chat' })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }
    }
    async getCartPage(req, res, next) {
        try {
            let cartId = req.params.cid
            let response = await navigationService.getCartProducts(cartId)
            res.render('cart.handlebars', { username: req.user, title: 'chat', products: response.message })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }


    }


    async getCartConfirmationPage(req, res, next) {
        try {
            res.render("cartConfirmation.handlebars", { username: req.user, title: 'cartConfirmation' })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }
    }
}
module.exports = new navigationController()