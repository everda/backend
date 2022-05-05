const CarritoDaoArchivo = require('../src/DAOS/carrito/CarritoDaoArchivo')

const cartModel = new CarritoDaoArchivo('./files/carrito.json');


//Crear un carro (Funcion del POST)
const createCart = async (req, res) => {
    let data = await cartModel.createCart();
    res.status(200).send({
        message: 'Carro creado',
        cart: data
    })

}

//Buscar un carro por id (Funcion del GET)
const getCartId = async (req, res) => {
    let id = parseInt(req.params.cid);

    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        let cart = await cartModel.getCart(id);
        if (!cart) {
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
            console.log(response)
            res.status(200).send({
                message: 'Carro borrado',
                cart: id,
                response: response
            }
            );
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
    let id = parseInt(req.params.cid);
    let product = req.body;
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    }
    else {
        let cart = JSON.parse(await cartModel.addProduct(id, product));
        res.status(200).send({
            message: 'Producto añadido',
            cart: cart
        }
        );
    }



}

//borrar item del carro
//(Funcion del DELETE/:id)
const removeProduct = async (req, res) => {
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
            let cart = await cart.removeProduct(id, product);
            res.status(200).send({
                message: 'Producto borrado'
            }
            );
        }
    }
}



module.exports = {
    createCart,
    getCartId,
    deleteCartId,
    addProduct,
    removeProduct

}





