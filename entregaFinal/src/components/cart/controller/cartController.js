const cartService = require('../services/cartService')

const winston = require('../../../utils/loggers/winston');
const { CompletionTriggerKind } = require('typescript');

class cartController {
    //Buscar un carro por id (Funcion del GET)
    async getCartId(req, res, next) {
        try {
            let id = req.params.cid;

            if (!id || id === ":cid") {
                let error = new Error("faltan datos")
                error.status = 400
                winston.warningLogger.error(error)
                throw error
            }
            let data = await cartService.getCart(id);
            if (data.status === 'error') {
                let error = new Error(data.message)
                if (data.message === 'Carro Inexistente') {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            res.status(200).send({
                message: 'Carro',
                cart: data.message
            }
            );




        }
        catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }
    }
    //Crear un carro (Funcion del POST)
    async createCart(req, res, next) {
        try {
            let data = await cartService.createCart();
            if (data.status === "error") throw new Error(data.message)
            res.status(200).send({
                message: 'Carro creado',
                cart: data.message
            })
        } catch (error) {
            winston.errorLogger.error(error)
            next(error)
        }
    }



    //Borrar un carro por id
    //(Funcion del DELETE)
    async deleteCartId(req, res, next) {
        try {
            let id = parseInt(req.params.cid);

            if (!id || id === ":cid") {
                let error = new Error("faltan datos")
                error.status = 400
                winston.warningLogger.error(error)
                throw error
            }
            let data = await cartService.deleteCart(id);
            if (data.status === "error") {
                let error = new Error(data.message)
                if (data.message === "Carrito Inexistente") {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            res.status(200).send({
                message: 'Carro borrado',
                cart: data.message
            }
            );


        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }

    }

    //Incorporar un producto al carro
    //(Funcion del POST/:id)
    async addProduct(req, res, next) {
        try {
            let id = req.params.cid;
            let product = req.body;
            if (!id || !product || id === ":cid") {
                let error = new Error("faltan datos")
                error.status = 400
                winston.warningLogger.error(error)
                throw error
            }
            let data = await cartService.addProduct(id, product);
            if (data.status === "error") {
                let error = new Error(data.message)
                if (data.message === "Carrito Inexistente") {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            res.status(200).send({
                message: 'Producto añadido',
                cart: data.message
            }
            );


        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)

        }
    }
    //borrar item del carro
    //(Funcion del DELETE/:id)
    async removeProduct(req, res, next) {
        try {
            let id = req.params.cid;
            let product = req.params.pid;
            if (!id || !product || id === ":cid") {
                let error = new Error("faltan datos")
                error.status = 400
                winston.warningLogger.error(error)
                throw error
            }
            let data = await cartService.removeProduct(id, product);
            if (data.status === "error") {
                let error = new Error(data.message)
                if (data.message === "Carrito Inexistente") {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            res.status(200).send({
                message: 'Producto borrado',
                cart: data.message
            }
            );
        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }
    }

    async confirmCart(req, res, next) {
        try {

            let data = await cartService.confirmCart(req.params.cid, req.user)
            if (data.status === "error") {
                let error = new Error(data.message)
                if (data.message === "Carrito Inexistente") {
                    error.status = 400
                    winston.warningLogger.error(error)
                }
                throw error
            }
            res.status(200).send({
                message: "carro Confirmado",
                order: data
            })
            
        } catch (error) {
            if (!error.status) winston.errorLogger.error(error)
            next(error)
        }
    }

}


module.exports = new cartController()





