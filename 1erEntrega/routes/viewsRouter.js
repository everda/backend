import express from "express";
import viewsController from "../controller/viewsController.js";
import productController from "../controller/productController.js";
import cartController from "../controller/cartController.js";
import cartModel from "../models/cartModel.js";
import { __dirname } from "../utils.js";


let cart = new cartModel(__dirname + '/Files/carrito.txt');
let cartContent = [];

//console.log(prodController.productsContent)



const Router = express.Router();

Router.get('/', (req, res) => { res.render('home.handlebars') });

Router.get('/users', viewsController.showUsers);

Router.get('/admin', viewsController.showAdminview);
Router.get('/admin/:id', viewsController.showEditItemview);
Router.get('/cart/:id', viewsController.showCart);



export default Router;
