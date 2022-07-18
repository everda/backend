const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cartController.js');




cartRouter.post('/', cartController.createCart);
cartRouter.delete('/:cid', cartController.deleteCartId);
cartRouter.get('/:cid/products', cartController.getCartId);
cartRouter.post('/:cid/products', cartController.addProduct);
cartRouter.delete('/:cid/products/:pid', cartController.removeProduct);

cartRouter.get('/:cid/confirm', cartController.confirmCart);


module.exports =  cartRouter ;