const productModel = require('../services/productService')
const winston = require('../../../utils/loggers/winston')

//const productModel = new ProductoDao();

class productsController {
    async getProducts(req, res) {
        try {
            let data = await productModel.getProducts();
            res.status(200).send({
                message: 'Productos',
                products: data
            })
        } catch (error) {
            console.log(error);
            winston.errorLogger.error(error)

        }
    }

    async getProductId(req, res) {
        try {

            let id = parseInt(req.params.pid);
            if (!id) {
                res.status(400).send({
                    message: 'Faltan datos',
                    description: 'id'
                });
            } else {
                let response = await productModel.getProduct(id);
                if (response === 'Producto inexistente') {
                    res.status(404).send({
                        message: 'Producto inexistente',
                        description: `id: ${id}`
                    });
                } else {
                    res.status(200).send({
                        message: 'Producto',
                        product: response
                    }
                    );
                }
            }
        } catch (error) {
            //console.log(error);
            winston.errorLogger.error(error)

        }
    }

    async createProduct(req, res) {
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
            //console.log(error);
            winston.errorLogger.error(error)

        }
    }

    async updateProduct(req, res) {
        try {
            let id = parseInt(req.params.pid);
            let data = req.body;
            if (!id) {
                res.status(400).send({
                    message: 'Faltan datos',
                    description: 'id'
                });
            } else {
                let response = await productModel.updateProduct(id, data);
                if (response === 'Producto inexistente') {
                    res.status(404).send({
                        message: 'Producto inexistente',
                        description: `id: ${id}`
                    });
                } else {
                    res.status(200).send({
                        message: 'Producto actualizado',
                        product: response
                    }
                    );
                }
            }
        } catch (error) {
            //console.log(error);
            winston.errorLogger.error(error)

        }
    }

    async deleteProduct(req, res) {
        try {
            let id = parseInt(req.params.pid);
            if (!id) {
                res.status(400).send({
                    message: 'Faltan datos',
                    description: 'id'
                });
            } else {
                let response = await productModel.deleteProduct(id);
                console.log(response.length);
                if (response.length < 1) {
                    res.status(404).send({
                        message: 'Producto inexistente',
                        description: `id: ${id}`
                    });
                } else {
                    res.status(200).send({
                        message: 'Producto eliminado',
                        product: response
                    }
                    );
                }
            }

        }
        catch (error) {
            //console.log(error);
            winston.errorLogger.error(error)

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