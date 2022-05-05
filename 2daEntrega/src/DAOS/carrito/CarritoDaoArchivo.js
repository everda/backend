const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor(nombreArchivo) {
        super(nombreArchivo)
    }
    async createCart() {
        try {
            let cart = [];
            let data = await this.getData();
            if (data.length > 0) {
                cart = JSON.parse(data);
            }
            let id = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;
            let newCart = {
                id: id,
                products: []
            }
            cart.push(newCart);
            let result = await this.saveData(cart);
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {
            let cart = JSON.parse(await this.getData());
            let cartId = cart.find(cart => cart.id === id);
            if (id === undefined) {
                throw new Error('Faltan datos');
            } else {
                if (!cartId) {
                    return ('Carro inexistente');
                } else {
                    cart = cart.filter(cart => cart.id !== id);
                    let result = await this.saveData(cart);
                    return result;
                }
            }
        } catch (error) {
            console.log(error);

        }
    }

    async addProduct(id, product) {
        try {
            let cart = JSON.parse(await this.getData());
            let cartId = cart.find(cart => cart.id === id);
            if (!cartId) {
                throw new Error('Carro inexistente');
            } else {
                let cartProducts = cartId.products;
                console.log(cartId)
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
                let result = await this.saveData(cart);
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async removeProduct(id, product) {
        try {
            let cart = await this.getData();
            let cartId = cart.find(cart => cart.id === id);
            if (!cartId) {
                throw new Error('Carro inexistente');
            } else {
                let cartProducts = cartId.products;
                let productId = cartProducts.find(prod => prod.id === product.id);
                if (productId) {
                    if (productId.quantity > 1) {
                        productId.quantity -= 1;
                    } else {
                        cartProducts = cartProducts.filter(prod => prod.id !== product.id);
                        productId.quantity = 0;
                    }
                }
                cartId.products = cartProducts;
                let result = await this.saveData(cart);
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCart(id) {
        try {
            let cart = JSON.parse(await this.getData());
            let cartId = cart.find(cart => cart.id === id);
            if (id === undefined) {
                return ('Faltan datos');
            } else {
                if (!cartId) {
                    return ('Carro inexistente');
                } else {
                    return cartId;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveCart(cart) {
        try {
            let result = await this.saveData(cart);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = CarritoDaoArchivo;