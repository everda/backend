import express from "express";
import productController from "../controller/productController.js";
import { __dirname } from "../utils.js";


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
const Router = express.Router();
Router.get('/:pid', productController.getProductsByid);
Router.get('/', productController.getProducts);
Router.post('/', adminCheck, productController.createProduct);
Router.put('/:pid', adminCheck, productController.updateProduct);
Router.delete('/:pid', adminCheck, productController.deleteProduct);

export default Router;