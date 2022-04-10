import express from "express";
import productController from "../controller/productController.js";
import cartController from "../controller/cartController.js";
import cartModel from "../models/cartModel.js";
import __dirname from "../utils.js";


let cart = new cartModel(__dirname + '/Files/carrito.txt');
let cartContent = [];

//console.log(prodController.productsContent)



const Router = express.Router();

Router.get('/', (req, res) => { res.render('home.handlebars') });

Router.get('/users', (req, res) => {
    productController.updateProductsArray().then(data => {
        console.log(data)
        res.render('users.handlebars', { products: data });
    })
    // let products = [];
    // fetch('http://localhost:8080/api/products')
    //     .then(response => response.json())
    //     .then(data => {
    //         products = data.products;
    //         console.log(products)
    //         res.render('users.handlebars', { products });
    //     })
    //     .catch(error => console.log(error));
})

Router.get('/admin', (req, res) => {
    productController.updateProductsArray().then(data => {
        res.render('admin.handlebars', { products: data });
    })

    // fetch('http://localhost:8080/api/products')
    //     .then(response => response.json())
    //     .then(data => {
    //         products = data.products;
    //         console.log(products)
    //         res.render('admin.handlebars', { products });
    //     })
    //     .catch(error => console.log(error));
})

Router.get('/cart/', (req, res) => {
    cart.getCart().then(data => {
        console.log(data)
        res.render('cart.handlebars', {  data });
    })
    // let products = [];
    // fetch('http://localhost:8080/api/cart')
    //     .then(response => response.json())
    //     .then(data => {
    //         cart = data.cart;
    //         console.log(products)
    //         res.render('cart.handlebars', { cart });
    //     })
    //     .catch(error => console.log(error));
})



export default Router;
