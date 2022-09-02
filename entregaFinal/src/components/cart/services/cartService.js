const dao = require('../../../models')
const winston = require('../../../utils/loggers/winston')
const cartDTO = require('./DTO')
const { sendTwillioMessage, sendUserMessage } = require('../../../utils/twillio/twilio')
const mailer = require('../../../utils/mailer/nodemailer')

class cartService {
    async getCart(id) {
        try {
            let response = await dao.cartDao.getCart(id);
            let res = cartDTO.sendCart(response)
            return res

        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async createCart() {
        try {

            let response = await dao.cartDao.createCart()
            let res = cartDTO.sendCart(response)
            return res
        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async deleteCart(id) {
        try {
            let response = await dao.cartDao.deleteCart(id)
            let res = cartDTO.sendCart(response)
            return res
        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async addProduct(id, product) {
        try {
            let cart = await dao.cartDao.getCart(id);
            if (!cart) {
                return [];
            } else {
                let products = cart.products;
                let productId = products.find(prod => prod.id === product.id);
                if (productId) {
                    productId.quantity += 1;
                } else {
                    products.push({ id: product.id, timestamp: Date.now(), quantity: 1 });
                }
                let response = await dao.cartDao.updateCart(id, products)
                let res = cartDTO.sendCart(response)
                return res

            }
        }
        catch (error) {
            winston.errorLogger.error(error)
        }



    }

    async removeProduct(id, product) {
        try {
            let cart = await dao.cartDao.getCart(id);
            if (!cart) {
                return 'Carro inexistente';
            } else {
                let products = cart.products;
                let productId = products.find(prod => prod.id === product);
                if (productId) {
                    if (productId.quantity > 1) {
                        productId.quantity -= 1;
                    } else {
                        products = products.filter(prod => prod.id !== product);
                    }
                }
                let response = await dao.cartDao.updateCart(id, products)
                let res = cartDTO.sendCart(response)
                return res

            }
        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }


    async confirmCart(id, userId) {
        try {
            let userData = await dao.userDao.getUsername(userId)
            let userPhone = userData.prefijo + userData.numero
            let cart = await dao.cartDao.getCart(id);
            let cartProducts = cart.products

            //populate products information to cart
            let products = await Promise.all(cartProducts.map(async (e) => {
                let { id, quantity } = e
                let { title, description, code, thumbnail, price, stock } = await dao.productDao.getProduct(id)
                let product = { id, title, description, code, thumbnail, price, stock, quantity }
                return product
            }))
            

            sendUserMessage(userPhone, "pedido confirmado")
            mailer.sendConfirmationMail(req.user, JSON.stringify(products))
            sendTwillioMessage('pedido enviado')
            return cartDTO.sendCart(products)


        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }

}


module.exports = new cartService();
