const cartModel = require('../services/CarritoDao')
const productController = require('../../products/controller/productController')
const mailer = require('../../../utils/mailer/nodemailer')
const { sendTwillioMessage, sendUserMessage } = require('../../../utils/twillio/twilio')
const user = require('../../login/controller/passportController')
const winston = require('winston/lib/winston/config')

//Crear un carro (Funcion del POST)
const createCart = async (req, res) => {
    try {
        let data = await cartModel.createCart();
        res.status(200).send({
            message: 'Carro creado',
            cart: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error al crear el carro',
            error
        })


    }
}

//Buscar un carro por id (Funcion del GET)
const getCartId = async (req, res) => {
    try {
        let id = parseInt(req.params.cid);

        if (id === undefined) {
            res.status(400).send({
                message: 'Faltan datos',
                description: 'id'
            });
        } else {
            let cart = await cartModel.getCart(id);
            if (cart === 'Carro inexistente') {
                res.status(404).send({
                    message: 'Carro inexistente',
                    description: `id: ${id}`
                });
            } else {
                res.status(200).send({
                    message: 'Carro',
                    cart: cart
                }
                );
            }



        }
    } catch (error) {
        res.status(500).send({
            message: 'Error',
            description: error
        });

    }
}
//Borrar un carro por id
//(Funcion del DELETE)
const deleteCartId = async (req, res) => {
    try {
        let id = parseInt(req.params.cid);
        if (!id) {
            res.status(400).send({
                message: 'Faltan datos',
                description: 'id'
            });
        } else {
            let response = await cartModel.deleteCart(id);
            if (response === 'Carro inexistente') {
                res.status(404).send({
                    message: 'Carro inexistente',
                    description: `id: ${id}`
                });
            } else {
                res.status(200).send({
                    message: 'Carro borrado',
                    cart: id
                }
                );
            }
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error interno del servidor',
            error: error
        }
        );
    }

}

//Incorporar un producto al carro
//(Funcion del POST/:id)
const addProduct = async (req, res) => {
    try {
        let id = parseInt(req.params.cid);
        let product = req.body;
        if (id === undefined) {
            res.status(400).send({
                message: 'Faltan datos',
                description: 'id'
            });
        }
        else {
            let response = await cartModel.addProduct(id, product);
            if (response === 'Carro inexistente') {
                res.status(404).send({
                    message: 'Carro inexistente',
                    description: `id: ${id}`
                });
            } else {
                res.status(200).send({
                    message: 'Producto añadido'
                }
                );
            }
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error interno del servidor',
            error: error
        }
        );
    }
}
//borrar item del carro
//(Funcion del DELETE/:id)
const removeProduct = async (req, res) => {
    try {
        let id = parseInt(req.params.cid);
        let product = parseInt(req.params.pid);
        if (id === undefined) {
            res.status(400).send({
                message: 'Faltan datos',
                description: 'id'
            });
        }
        else {
            if (product === undefined) {
                res.status(400).send({
                    message: 'Faltan datos',
                    description: 'product'
                });
            }
            else {

                let response = await cartModel.removeProduct(id, product);
                if (response === 'Carro inexistente') {
                    res.status(404).send({
                        message: 'Carro inexistente',
                        description: `id: ${id}`
                    });
                } else {

                    res.status(200).send({
                        message: 'Producto borrado'
                    }
                    );
                }
            }
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error interno del servidor',
            error: error
        }
        );
    }
}

const confirmCart = async (req, res) => {
    try {
        let cartId = parseInt(req.params.cid)
        let userData = await user.userInstance.getUsernameData(req.user)

        let userPhone = userData.prefijo + userData.numero
        console.log(userPhone);

        if (cartId === undefined) {
            res.status(400).send({
                message: 'Faltan datos',
                description: 'cartId'
            });
        }
        else {

            //console.log("hola desde daomongo");
            let cart = await cartModel.getCart(cartId);
            let cartProducts = cart.products
            let products = await Promise.all(cartProducts.map(async (e) => {

                let { id, quantity } = e
                let { title, description, code, thumbnail, price, stock } = await productController.productModel.getProduct(id)
                let product = { id, title, description, code, thumbnail, price, stock, quantity }
                return product

            }))
            sendUserMessage(userPhone, "pedido confirmado")
            mailer.sendConfirmationMail(req.user, JSON.stringify(products))
            sendTwillioMessage('pedido enviado')


            res.status(200).send({
                message: "carro Confirmado"

            })

        }




    } catch (error) {
        res.status(500).send({
            message: 'Error interno del servidor',
            error: error
        }
        );
    }
}




module.exports = {
    createCart,
    getCartId,
    deleteCartId,
    addProduct,
    removeProduct,
    confirmCart

}





