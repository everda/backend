import Cart from '../models/cartModel.js';
import __dirname from '../utils.js';

// //Inicializo el carro
let cart = new Cart(__dirname + '/Files/carrito.txt');
let cartContent = [];
let id = 0




const updateCart = () => {
    cart.getCart().then(data => {

        if (data.length == 0) {
            cartContent = [];
        } else {

            cartContent = JSON.parse(data);
        }

    }).catch(err => {
        console.log(err);
    }
    )
}
updateCart();


//Funciones del controlador

//Crear un carro (Funcion del POST)
const createCart = (req, res) => {
    id = id + 1;
    cartContent.push({
        id: id,
        timestamp: Date.now(),
        products: []
    });
    
    cart.saveCart(cartContent).then(() => {

        res.status(200).send({
            message: 'Carrito creado',
            cart: id
        })
    }).catch(err => {
        res.status(500).send({
            message: 'Error',
            description: err
        })
    })
}

//Buscar un carro por id (Funcion del GET)
const getCartId = (req, res) => {
    let id = parseInt(req.params.cid);
    let cartId = cartContent.find(cart => cart.id === id);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (!cartId) {
            res.status(404).send({
                message: 'Carro inexistente',
                description: `id: ${id}`
            });
        } else {
            res.status(200).send({
                message: 'Carro',
                cart: cartId
            }
            );
        }
    }
}

//Borrar un carro por id
//(Funcion del DELETE)
const deleteCartId = (req, res) => {
    let id = parseInt(req.params.cid);

    let cartId = cartContent.find(cart => cart.id === id);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (!cartId) {
            res.status(404).send({
                message: 'Carro inexistente',
                description: `id: ${id}`
            });
        } else {
            cartContent = cartContent.filter(cart => cart.id !== id);
            cart.saveCart(cartContent).then(() => {
                res.status(200).send({
                    message: 'Carro eliminado',
                    cart: cartId
                })
            }).catch(err => {
                res.status(500).send({
                    message: 'Error',
                    description: err
                })
            }
            )
        }
    }
}

//Incorporar un producto al carro
//(Funcion del POST/:id)
const addProduct = (req, res) => {

    let id = parseInt(req.params.cid);
    let product = req.body;
    let cartId = cartContent.find(cart => cart.id === id);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (!cartId) {
            res.status(404).send({
                message: 'Carro inexistente',
                description: `id: ${id}`
            });
        } else {
            let cartProducts = cartId.products;
            let productId = cartProducts.find(prod => parseInt(prod.id) === parseInt(product.id));
            if (productId) {
                productId.quantity += 1;
            } else {
                let cartArray = cartContent.findIndex(cart => cart.id === id);
                cartContent[cartArray].products.push({ id: product.id, quantity: 1 });;
            }
            cart.saveCart(cartContent).then(() => {
                res.status(200).send({
                    message: 'Producto agregado',
                    cart: id,
                    product: product
                })
            }).catch(err => {
                res.status(500).send({
                    message: 'Error',
                    description: err
                })
            }
            )

        }
    }

}

//borrar item del carro
//(Funcion del DELETE/:id)
const deleteProduct = (req, res) => {
    let id = parseInt(req.params.cid);
    let product = parseInt(req.params.pid);
    let cartId = cartContent.find(cart => cart.id === id);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (!cartId) {
            res.status(404).send({
                message: 'Carro inexistente',
                description: `id: ${id}`
            });
        } else {
            let cartProducts = cartId.products;
            let productId = cartProducts.find(prod => parseInt(prod.id) === parseInt(product));
            if (productId) {

                if (productId.quantity > 1) {
                    productId.quantity -= 1;
                } else {
                    cartContent[id - 1].products = cartProducts.filter(prod => prod.id !== product);
                    productId.quantity = 0;
                }

                cart.saveCart(cartContent).then(() => {
                    res.status(200).send({
                        message: 'Producto eliminado',
                        cart: id,
                        product: productId
                    })
                }).catch(err => {
                    res.status(500).send({
                        message: 'Error',
                        description: err
                    })
                }
                )
                // .finally(() => {
                //     console.log(cartContent[id - 1].products);
                // })
            } else {
                res.status(404).send({
                    message: 'Producto inexistente',
                    id: product
                })
                // console.log(cartContent[id - 1].products);

            }

        }
    }
}










export default {
    createCart,
    getCartId,
    deleteCartId,
    addProduct,
    deleteProduct
};
