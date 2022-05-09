const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');


class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('cartCollection');
    }

    async getCart(cid) {
        let response = await this.query.where('id', '==', cid).get();
        if (response.empty) {
            return 'Carro inexistente';
        }
        return response.docs[0].data();
    }

    async createCart() {
        let lastRecord = await this.query.orderBy('id', 'desc').limit(1).get();
        if (lastRecord.empty) {
            return await this.query.add({ id: 1, timestamp: Date.now(), products: [] });
        } else {

            let id = lastRecord.docs[0].data().id ? lastRecord.docs[0].data().id + 1 : 1;
            return await this.query.add({ id: id, timestamp: Date.now(), products: [] });
        }

    }

    async deleteCart(id) {
        let doc = await this.query.where('id', '==', id).get();
        if (!doc.docs[0] === undefined) {
            return 'Carro inexistente';
        } else {
            await this.query.doc(doc.docs[0].id).delete();
        }
    }
    
    async addProduct(id, product) {
            let doc = await this.query.where('id', '==', id).get();
            if (doc.docs[0]=== undefined) {
                return 'Carro inexistente';
            } else {
                let products = doc.docs[0].data().products;
                let productId = products.find(prod => prod.id === product.id);
                if (productId) {
                    productId.quantity += 1;
                } else {
                    products.push({ id: product.id, timestamp: Date.now(), quantity: 1 });
                }
                let response = await this.query.doc(doc.docs[0].id).update({ products: products });
                return doc.docs[0].data();
            }
        }

    async removeProduct(id, product) {
            let doc = await this.query.where('id', '==', id).get();

            if (doc.docs[0] === undefined) {
                return 'Carro inexistente';
            } else {
                let products = doc.docs[0].data().products;
                let productId = products.find(prod => prod.id === product);
                if (productId) {
                    if (productId.quantity > 1) {

                        productId.quantity -= 1;
                    } else {
                        products = products.filter(prod => prod.id !== product);
                    }
                    let response = await this.query.doc(doc.docs[0].id).update({ products: products });
                    return doc.docs[0].data();

                } else {
                    return 'Producto inexistente';
                }


            }


        }
    }


module.exports = CarritoDaoFirebase;
