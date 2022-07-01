const ContenedorMemoria = require('../../contenedores/ContenedorMemoria')

class CarritoDaoMemoria extends ContenedorMemoria {
    constructor() {
        super()
    }

    getCart(id) {
        let cart = this.getData();
        let cartId = cart.find(cart => cart.id === id);
        if (!cartId) {
            return ('Carro inexistente');
        } else {
            return cartId;
        }
    }

    createCart() {
        let cart = this.getData();
        let id = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;
        let newCart = {
            id: id,
            timestamp: Date.now(),
            products: []
        }
        cart.push(newCart);
        let result = this.saveData(cart);
        return result;



    }

    deleteCart(id) {

        let cart = this.getData();
        let cartId = cart.find(cart => cart.id === id);
        if (id === undefined) {
            throw new Error('Faltan datos');
        } else {
            if (!cartId) {
                return ('Carro inexistente');
            } else {
                cart = cart.filter(cart => cart.id !== id);
                let result = this.saveData(cart);
                return result;
            }
        }
    }

    addProduct(id, product) {
        let cart = this.getData();
        let cartId = cart.find(cart => cart.id === id);
        if (!cartId) {
            throw new Error('Carro inexistente');
        } else {
            let cartProducts = cartId.products;
            let productId = cartProducts.find(prod => prod.id === product.id);
            if (productId) {
                productId.quantity += 1;
            } else {
                let newProd = {
                    id: product.id,
                    timestamp: Date.now(),
                    quantity: 1
                }
                cartProducts.push(newProd);
            }
            cartId.products = cartProducts;
            let result = this.saveData(cart);
            return result;
        }
    }

    removeProduct(id, product) {
        let cart = this.getData();
        let cartId = cart.find(cart => cart.id === id);
        if (!cartId) {
            return ('Carro inexistente');
        } else {
            let cartProducts = cartId.products;
            let productId = cartProducts.find(prod => prod.id === product);
            if (productId) {
                if (productId.quantity > 1) {
                    productId.quantity -= 1;
                } else {
                    cartProducts = cartProducts.filter(prod => prod.id !== product);
                    productId.quantity = 0;
                }
            }
            cartId.products = cartProducts;
            let result = this.saveData(cart);
            return result;
        }
    }


}
module.exports = CarritoDaoMemoria;