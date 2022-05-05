const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController.js');


cartRouter.post('/', cartController.createCart);
cartRouter.delete('/:cid', cartController.deleteCartId);
cartRouter.get('/:cid/products', cartController.getCartId);
cartRouter.post('/:cid/products', cartController.addProduct);
cartRouter.delete('/:cid/products/:pid', cartController.removeProduct);



module.exports = { cartRouter };