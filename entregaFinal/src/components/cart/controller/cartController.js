const cartService = require('../services/cartService')

const winston = require('../../../utils/loggers/winston')

class cartController {
    //Crear un carro (Funcion del POST)
    async createCart(req, res) {
        try {
            let data = await cartService.createCart();
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
    async getCartId(req, res) {
        try {
            let id = parseInt(req.params.cid);

            if (id === undefined) {
                res.status(400).send({
                    message: 'Faltan datos',
                    description: 'id'
                });
            } else {
                let data = await cartService.getCart(id);
                if (data === 'Carro inexistente') {
                    res.status(404).send({
                        message: 'Carro inexistente',
                        description: `id: ${id}`
                    });
                } else {
                    res.status(200).send({
                        message: 'Carro',
                        cart: data
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
    async deleteCartId(req, res) {
        try {
            let id = parseInt(req.params.cid);
            if (!id) {
                res.status(400).send({
                    message: 'Faltan datos',
                    description: 'id'
                });
            } else {
                let data = await cartService.deleteCart(id);
                if (data === 'Carro inexistente') {
                    res.status(404).send({
                        message: 'Carro inexistente',
                        description: `id: ${id}`
                    });
                } else {
                    res.status(200).send({
                        message: 'Carro borrado',
                        cart: data
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
    async addProduct(req, res) {
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
                let data = await cartModel.addProduct(id, product);
                if (data === 'Carro inexistente') {
                    res.status(404).send({
                        message: 'Carro inexistente',
                        description: `id: ${id}`
                    });
                } else {
                    res.status(200).send({
                        message: 'Producto añadido',
                        cart: data
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
    async removeProduct(req, res) {
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

                    let data = await cartModel.removeProduct(id, product);
                    if (data === 'Carro inexistente') {
                        res.status(404).send({
                            message: 'Carro inexistente',
                            description: `id: ${id}`
                        });
                    } else {

                        res.status(200).send({
                            message: 'Producto borrado',
                            cart: data
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

    async confirmCart(req, res) {
        try {
            let data = await cartService.confirmCart(req.params.cid, req.user)
            if (data === []) {
                res.status(400).send({
                    message: 'no existe carro',
                    description: 'cartId'
                });
            }
            else {
                res.status(200).send({
                    message: "carro Confirmado",
                    order: data

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

}


module.exports = new cartController()





