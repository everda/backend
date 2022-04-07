import express from "express";
import cartController from "../controller/cartController.js";



const Router = express.Router();


Router.post('/', cartController.createCart );
Router.delete('/:cid', cartController.deleteCartId );
Router.get('/:cid/products', cartController.getCartId );
Router.post('/:cid/products', cartController.addProduct );
Router.delete('/:cid/products/:pid', cartController.deleteProduct );    


export default Router;