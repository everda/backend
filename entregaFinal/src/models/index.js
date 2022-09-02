
let config = require('../config')

class Dao {
    constructor() {
        if (config.DB === 'Mongo') {
            this.cartDao = require('./mongo/DAO/cart/cartDao')
            this.chatDao = require('./mongo/DAO/chat/chatDao')
            this.productDao = require('./mongo/DAO/product/productDao')
            this.userDao = require('./mongo/DAO/user/userDao')
        }
    }
}

module.exports = new Dao()