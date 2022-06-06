const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')


class ProductoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productsCollection');
    }

    async getProducts() {
        try {
            let response = await this.query.get();
            return response.docs.map(doc => doc.data());
        }
        catch (error) {
            console.log(error)
        }

    }

    async getProduct(id) {
        try {
            let response = await this.query.where('id', '==', id).get();
            if (!response.docs[0]) {
                return ('Producto inexistente');
            } else {
                return response.docs[0].data();
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async createProduct(product) {
        try {
            let lastRecord = await this.query.orderBy('id', 'desc').limit(1).get();
            if (lastRecord.empty) {
                return await this.query.add({ id: 1, ...product });
            } else {
                let id = lastRecord.docs[0].data().id ? lastRecord.docs[0].data().id + 1 : 1;
                let response = await this.query.add({ id: id, ...product });

            }
        }
        catch (error) {
            console.log(error)
        }
    }


    async updateProduct(id, product) {
        try {
            let doc = await this.query.where('id', '==', id).get();
            if (!doc.docs[0]) {
                return 'Producto inexistente';
            } else {
                await this.query.doc(doc.docs[0].id).update({ ...product });

            }
        }
        catch (error) {
            console.log(error)
        }

    }

    async deleteProduct(id) {
        try {
            let doc = await this.query.where('id', '==', id).get();
            console.log(doc.docs[0])
            if (!doc.docs[0]) {
                return 'Producto inexistente';
            } else {
                let response = await this.query.doc(doc.docs[0].id).delete();
                return response;
            }
        }
        catch (error) {
            console.log(error)
        }

    }
}


module.exports = ProductoDaoFirebase;