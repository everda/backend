import express from "express";
import prodController from '../controller/productController.js';
import fetch from "node-fetch";



//console.log(prodController.productsContent)


const Router = express.Router();

Router.get('/', (req, res) => { res.render('home.handlebars') });

Router.get('/users', (req, res) => {
    let products = [];
    fetch('http://localhost:8080/api/products')
        .then(response => response.json())
        .then(data => {
            products = data.products;
            console.log(products)
            res.render('users.handlebars', { products });
        })
        .catch(error => console.log(error));


})


export default Router;
