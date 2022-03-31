import express from "express";

let cart  = [];

const Router = express.Router();

Router.get('/', (req, res) => {
    if (cart.length === 0) {
        res.status(404).send({
            message: 'Carrito vacio'
        });
    } else {
        res.status(200).send({
            message: 'Carrito',
            cart
        });
    
    }
});

Router.post('/', (req, user,  res) => {
    cart.push(req.body);
    res.status(200).send({
        message: 'Producto agregado al carrito',
        cart
    });
});



export default Router;