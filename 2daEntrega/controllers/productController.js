const ProductoDao = require('../src/DAOS/productos/ProductoDao')

const productModel = new ProductoDao();


const getProducts = async (req, res) => {
    let data = await productModel.getProducts();
    res.status(200).send({
        message: 'Productos',
        products: data
    })
}

const getProductId = async (req, res) => {
    let id = parseInt(req.params.pid);
    if (!id) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        let response  = await productModel.getProduct(id);
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
}

const createProduct = async (req, res) => {
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
}

const updateProduct = async (req, res) => {
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
}

const deleteProduct = async (req, res) => {
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

module.exports = {
    getProducts,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
}