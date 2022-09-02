const dao = require('../../../models')
const winston = require('../../../utils/loggers/winston')
const productDTO = require('./DTO')


class productService {

    async getProducts() {
        try {
            console.log("entro");
            let response = await dao.productDao.getProducts()
            let res = productDTO.sendProducts(response)
            return res

        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async getProduct(id) {
        try {
            let response = await dao.productDao.getProduct(id)
            let res = productDTO.sendProducts(response)
            return res
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async createProduct(product) {
        try {
            let response = await dao.productDao.createProduct(product)
            let res = productDTO.sendProducts(response)
            return res
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


    async updateProduct(id, product) {
        try {
            let response = await dao.productDao.updateProduct(id, product)
            let res = productDTO.sendProducts(response)
            return res
        } catch (error) {
            winston.errorLogger.error(error)
        }

    }

    async deleteProduct(id) {
        try {
            let response = await dao.productDao.deleteProduct(id)
            let res = productDTO.sendProducts(response)
            
            return res
        } catch (error) {
            winston.errorLogger.error(error)
        }

    }


}

module.exports = new productService()