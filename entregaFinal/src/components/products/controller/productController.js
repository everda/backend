const productModel = require('../services/productService')
const winston = require('../../../utils/loggers/winston');
const { NetworkContext } = require('twilio/lib/rest/supersim/v1/network');

//const productModel = new ProductoDao();

class productsController {
    async getProducts(req, res, next) {
        try {
            let response = await productModel.getProducts();
            if (response.status === "error") { throw new Error(response.message) }
            res.status(200).send({
                message: 'Productos',
                products: response
            })
        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }
    }

    async getProductId(req, res, next) {
        try {

            let id = req.params.pid;
            if (!id || id === ":cid") {
                let error = new Error("faltan datos")
                error.status = 400
                winston.warningLogger.error(error)
                throw error
            }
            let response = await productModel.getProduct(id);
            if (response.status === "error") {
                let error = new Error(response.message)
                if (response.message === "Producto Inexistente") {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            res.status(200).send({
                message: 'Producto',
                product: response
            }
            );


        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }
    }

    async createProduct(req, res, next) {
        try {
            let data = req.body;
            if (!data.title || !data.price || !data.stock) {
                res.status(400).send({
                    message: 'Faltan datos',
                });
            } else {
                let response = await productModel.createProduct(data);

                res.status(200).send({
                    message: 'Producto creado',
                    product: response

                })
            }
        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            let id = req.params.pid;
            let data = req.body;
            if (!id || !data || id === ":cid") {
                let error = new Error("faltan datos")
                error.status = 400
                winston.warningLogger.error(error)
                throw error
            }
            let response = await productModel.updateProduct(id, data);
            if (response.status === "error") {
                let error = new Error(response.message)
                if (response.message === "Producto Inexistente") {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            // if (response === 'Producto inexistente') {
            //     res.status(404).send({
            //         message: 'Producto inexistente',
            //         description: `id: ${id}`
            //     });
            // } else {
            res.status(200).send({

                message: 'Producto actualizado',
                product: response
            }
            );


        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)

            next(error)

        }
    }

    async deleteProduct(req, res, next) {
        try {
            let id = req.params.pid;
            if (!id || id === ":cid") {
                let error = new Error("faltan datos")
                error.status = 400
                winston.warningLogger.error(error)
                throw error
            }
            let response = await productModel.deleteProduct(id);
            if (response.status === "error") {
                let error = new Error(response.message)
                if (response.message === "Producto Inexistente") {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            res.status(200).send({
                message: 'Producto eliminado',
                product: response
            }
            );



        }
        catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }

    }

    // async getPorudctsTest   ()  {
    //     try {
    //         let products = await productModel.getTestProducts(10);
    //         return products
    //     }
    //     catch (error) {
    //         //console.log(error);
    //         winston.errorLogger.error(error)

    //     }
    // }
}

module.exports = new productsController()