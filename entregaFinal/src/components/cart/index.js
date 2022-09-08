
let { Router } = require("express");
let cartController = require("./controller/cartController");
const { Islogged, IsNotlogged } = require('../../utils/JWT/jwt')


module.exports = app => {
     let router = new Router();
     app.use("/api/carts", router);
     router.use('/', IsNotlogged)
     router.post('/', cartController.createCart);
     router.delete('/:cid', cartController.deleteCartId);
     router.get('/:cid/products', cartController.getCartId);
     router.post('/:cid/products', cartController.addProduct);
     router.delete('/:cid/products/:pid', cartController.removeProduct);
     router.get('/:cid/confirm', cartController.confirmCart);
}