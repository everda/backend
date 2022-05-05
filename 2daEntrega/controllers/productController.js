const ProductoDaoArchivo = require('../src/DAOS/productos/ProductoDaoArchivo')

const productModel = new ProductoDaoArchivo('./files/productos.json');


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
        let product = await productModel.getProduct(id);
        if (!product) {
            res.status(404).send({
                message: 'Producto inexistente',
                description: `id: ${id}`
            });
        } else {
            res.status(200).send({
                message: 'Producto',
                product: product
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
            description: 'name, price, stock'
        });
    } else {
        let product = await productModel.createProduct(data);
        res.status(200).send({
            message: 'Producto creado',
            product: product
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
        let product = await productModel.updateProduct(id, data);
        if (!product) {
            res.status(404).send({
                message: 'Producto inexistente',
                description: `id: ${id}`
            });
        } else {
            res.status(200).send({
                message: 'Producto actualizado',
                product: product
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
        let product = await productModel.deleteProduct(id);
        if (!product) {
            res.status(404).send({
                message: 'Producto inexistente',
                description: `id: ${id}`
            });
        } else {
            res.status(200).send({
                message: 'Producto eliminado',
                product: product
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