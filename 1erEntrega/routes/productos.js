import express from "express";
import Products from "../classes/products.js"
import __dirname from "../utils.js";


let products = new Products(__dirname + '/Files/productos.txt');


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

Router.get('/:id', (req, res) => {
    let id = req.params.id;
    if (id === "all") {
        products.getProducts().then(data => {
            if (data === "" || data === null || data === undefined) {
                res.status(404).send({
                    message: 'No hay productos'
                });
            } else {

                res.status(200).send({
                    message: 'Productos',
                    products: JSON.parse(data)
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: 'Error',
                description: err
            })
        })

    } else {
        products.getProductbyId(id).then(data => {
            
            if (data === "" || data === null || data === undefined) {
                res.status(404).send({
                    message: 'Producto no encontrado',
                    description: `id: ${id}`
                })
            } else {

            
                res.status(200).send({
                    message: 'Producto',
                    product: data
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Error',
                description: err
            })
        })

    }
});


Router.post('/', adminCheck, (req, res) => {
    let product = req.body;
    products.createProduct(product);
    res.status(200).send({
        message: 'Producto creado',
        product
    });
    console.log("Producto Creado")
});

Router.put('/:id', adminCheck, (req, res) => {
    let id = req.params.id;
    let product = req.body;
    products.updateProduct(id, product);
    res.status(200).send({
        message: 'Producto actualizado',
        product
    });
});

Router.delete('/:id', adminCheck, (req, res) => {
    let id = req.params.id;
    products.deleteProduct(id);
    res.status(200).send({
        message: 'Producto eliminado'
    });
}
);

export default Router;