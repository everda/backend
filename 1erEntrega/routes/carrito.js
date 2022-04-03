import express from "express";

let cart = [];

const Router = express.Router();


Router.post('/', (req, res) => {
    let id = cart.length + 1;
    cart.push({
        id,
        timestamp: new Date(),
        products: {}
    });

    res.status(200).send({
        message: 'Carrito creado',
        carrito: id
    });



});

Router.post('/:id/productos', (req, res) => {
    let id = parseInt(req.params.id);
    let cartId = cart.findIndex(cart => cart.id === id);
    let product = req.body;
    console.log(product)
    console.log("empieza")

    if (cartId === -1) {
        res.status(404).send({
            message: 'Carrito no encontrado',
            description: `id: ${id}`
        })
    } else {

        
        cart[cartId].products = cart[cartId].products , product; 
        res.status(200).send({  
            message: 'Producto agregado',
            cart: cart
        })
    }
    console.log(cart[cartId].products)
    console.log("termina")
});




Router.delete('/:id/productos/:id_Prod', (req, res) => {
    let id = req.params.id;
    let idProducto = req.params.id_Prod;
    cart[id].products.splice(idProducto, 1);
    res.status(200).send({
        message: 'Producto eliminado',
        product
    });
});




export default Router;