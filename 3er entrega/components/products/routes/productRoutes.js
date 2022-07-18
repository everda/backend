const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController.js');


let admin = true;

const adminCheck = (req, res, next) => {
    if (admin) {
        next();
    } else {
        res.status(401).send({
            message: "-1",
            description: `ruta: ${req.url} - metodo: ${req.method} no autorizado`
        });
    }
};

productRouter.get('/', productController.getProducts);
productRouter.get('/:pid', productController.getProductId);
productRouter.post('/', adminCheck, productController.createProduct);
productRouter.put('/:pid', adminCheck, productController.updateProduct);
productRouter.delete('/:pid', adminCheck, productController.deleteProduct);





module.exports = productRouter;