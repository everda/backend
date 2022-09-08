const dao = require('../../../models')
const winston = require('../../../utils/loggers/winston')
const productDTO = require('./DTO')


class productService {

    async getProducts() {
        try {

            let response = await dao.productDao.getProducts()
            if (response.status === "error") { throw new Error(response.error) }
            if (!response) { throw new Error("Producto Inexistente") }
            let res = productDTO.sendProducts(response)
            return res

        } catch (error) {
            return { status: "error", message: error.message }


        }
    }

    async getProduct(id) {
        try {
            let response = await dao.productDao.getProduct(id)
            if (response.status === "error") { throw new Error(response.error) }
            if (!response) { throw new Error("Producto Inexistente") }
            let res = productDTO.sendProducts(response)
            return res
        } catch (error) {
            return { status: "error", message: error.message }

        }
    }

    async createProduct(product) {
        try {
            let response = await dao.productDao.createProduct(product)
            if (response.status === "error") { throw new Error(response.error) }
            let res = productDTO.sendProducts(response)
            return res
        } catch (error) {
            return { status: "error", message: error.message }

        }
    }


    async updateProduct(id, product) {
        try {
            let response = await dao.productDao.updateProduct(id, product)
            if (!response) { throw new Error("Producto Inexistente") }
            if (response.status === "error") { throw new Error(response.error) }
            let res = productDTO.sendProducts(response)
            return res
        } catch (error) {
            return { status: "error", message: error.message }

        }

    }

    async deleteProduct(id) {
        try {
            let response = await dao.productDao.deleteProduct(id)
            if (!response) { throw new Error("Producto Inexistente") }
            if (response.status === "error") { throw new Error(response.error) }
            let res = productDTO.sendProducts(response)

            return res
        } catch (error) {
            return { status: "error", message: error.message }

        }

    }


}

module.exports = new productService()