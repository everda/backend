const dao = require('../../../models')
const winston = require('../../../utils/loggers/winston')

class navigationService {

    async getUsername(email) {
        try {
            let response = await dao.userDao.getUsername(email)
            if (response) {
                return response.username
            } else {
                return null
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async getUsernameInfo(email) {
        try {
            let response = await dao.userDao.getUsername(email)
            if (response) {
                return response
            } else {
                return null
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async getProducts() {
        try {
            let products = dao.productDao.getProducts()
            return products
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async getCartProducts(id) {
        try {
            let cart = await dao.cartDao.getCart(id)
            let cartProducts = cart.products
            //populate products information to cart
            let products = await Promise.all(cartProducts.map(async (e) => {
                let { id, quantity } = e
                let { title, description, code, thumbnail, price, stock } = await dao.productDao.getProduct(id)
                let product = { id, title, description, code, thumbnail, price, stock, quantity }
                return product
            }))
            return { status: "ok", message: products }

        } catch (error) {
            return { status: "error", message: error.message }

        }
    }



}

module.exports = new navigationService()
