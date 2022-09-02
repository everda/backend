
let { Router } = require("express");
const productController = require('./controller/productController.js');


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



module.exports = app => {
    let router = new Router();
    app.use("/api/products", router);
    router.get('/', productController.getProducts);
    router.get('/:pid', productController.getProductId);
    router.post('/', adminCheck, productController.createProduct);
    router.put('/:pid', adminCheck, productController.updateProduct);
    router.delete('/:pid', adminCheck, productController.deleteProduct);
}