const CarritoDao = require('../src/DAOS/carrito/CarritoDao')
const cartModel = new CarritoDao();


//Crear un carro (Funcion del POST)
const createCart = async (req, res) => {
    try {
        let data = await cartModel.createCart();
        res.status(200).send({
            message: 'Carro creado',
            cart: data
        })
    } catch (error) {
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
                console.log("remove product")
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



module.exports = {
    createCart,
    getCartId,
    deleteCartId,
    addProduct,
    removeProduct

}





