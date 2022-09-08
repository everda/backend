const dao = require('../../../models')
const winston = require('../../../utils/loggers/winston')
const cartDTO = require('./DTO')
const { sendTwillioMessage, sendUserMessage } = require('../../../utils/twillio/twilio')
const mailer = require('../../../utils/mailer/nodemailer')

class cartService {
    async getCart(id) {
        try {
            let response = await dao.cartDao.getCart(id);
            if (!response) { throw new Error("Carro Inexistente") }
            if (response.status === "error") { throw new Error(response.error) }
            let res = cartDTO.sendCart(response)
            return { status: "ok", message: res }
        }
        catch (error) {
            return { status: "error", message: error.message }
        }
    }

    async createCart() {
        try {

            let response = await dao.cartDao.createCart()
            let res = cartDTO.sendCart(response)
            return { status: "ok", message: res }
        }
        catch (error) {
            return { status: "error", message: error.message }
        }
    }

    async deleteCart(id) {
        try {
            let response = await dao.cartDao.deleteCart(id)
            if (!response) { throw new Error("Carrito Inexistente") }
            if (response.status === "error") { throw new Error(response.error) }
            let res = response ? cartDTO.sendCart(response) : []
            return { status: "ok", message: res }
        }
        catch (error) {
            return { status: "error", message: error.message }
        }
    }

    async addProduct(id, product) {
        try {
            let cart = await dao.cartDao.getCart(id);
            if (!cart) { throw new Error("Carrito Inexistente") }
            let products = cart.products
            //console.log(cart);
            if (products) {
                let productId = products.find(prod => prod.id === product.id);
                if (productId) {
                    productId.quantity += 1;
                } else {
                    products.push({ id: product.id, timestamp: Date.now(), quantity: 1 });
                }
            } else {
                cart.products.push({ id: product.id, timestamp: Date.now(), quantity: 1 });
            }

            await dao.cartDao.updateCart(id, products)
            let response = await dao.cartDao.getCart(id);
            let res = cartDTO.sendCart(response)
            return { status: "ok", message: res }
        }
        catch (error) {
            return { status: "error", message: error.message }
        }



    }

    async removeProduct(id, product) {
        try {
            let cart = await dao.cartDao.getCart(id);
            if (!cart) { throw new Error("Carrito Inexistente") }
            let products = cart.products;
            let productId = products.find(prod => prod.id === parseInt(product));
            if (productId) {
                if (productId.quantity > 1) {
                    productId.quantity -= 1;
                } else {
                    products = products.filter(prod => prod.id !== parseInt(product));
                }
            } else {
                throw new Error("Producto Inexistente")
            }
            await dao.cartDao.updateCart(id, products)
            let response = await dao.cartDao.getCart(id);
            let res = cartDTO.sendCart(response)
            return { status: "ok", message: res }
        }
        catch (error) {
            return { status: "error", message: error.message }
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
            mailer.sendConfirmationMail(userId, JSON.stringify(products))
            sendTwillioMessage('pedido enviado')
            
            let res = cartDTO.sendCart(cart)

            return { status: "ok", message: res }
        }
        catch (error) {
            console.log(error);
            return { status: "error", message: error }
        }
    }

}


module.exports = new cartService();
