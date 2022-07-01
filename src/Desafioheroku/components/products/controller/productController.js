const ProductoDao = require('../services/ProductoDao')
const winston = require('../../../utils/loggers/winston')

const productModel = new ProductoDao();


const getProducts = async (req, res) => {
    try {
        let data = await productModel.getProducts();
        res.status(200).send({
            message: 'Productos',
            products: data
        })
    } catch (error) {
        //console.log(error);
        winston.errorLogger.error(error)

    }
}

const getProductId = async (req, res) => {
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

const createProduct = async (req, res) => {
    try {
        let data = req.body;
        if (!data.title || !data.price || !data.stock) {
            res.status(400).send({
                message: 'Faltan datos',
            });
        } else {
            await productModel.createProduct(data);
            res.status(200).send({
                message: 'Producto creado'
            })
        }
    } catch (error) {
        //console.log(error);
        winston.errorLogger.error(error)

    }
}

const updateProduct = async (req, res) => {
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
                    message: 'Producto actualizado'
                }
                );
            }
        }
    } catch (error) {
        //console.log(error);
        winston.errorLogger.error(error)

    }
}

const deleteProduct = async (req, res) => {
    try {
        let id = parseInt(req.params.pid);
        if (!id) {
            res.status(400).send({
                message: 'Faltan datos',
                description: 'id'
            });
        } else {
            let response = await productModel.deleteProduct(id);
            if (response === 'Producto inexistente') {
                res.status(404).send({
                    message: 'Producto inexistente',
                    description: `id: ${id}`
                });
            } else {
                res.status(200).send({
                    message: 'Producto eliminado'
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

const getPorudctsTest = async () => {
    try {
        let products = await productModel.getTestProducts(10);
        return products
    }
    catch (error) {
        //console.log(error);
        winston.errorLogger.error(error)

    }
}


module.exports = {
    getProducts,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct, getPorudctsTest
}