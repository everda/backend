
const {  admin } = require('./../../config/databases.js');

class ContenedorFirebase {
    constructor(collection) {
        this.db = admin.firestore();
        this.query = this.db.collection(collection)

    }

    async connect() {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            }
            );
        } catch (err) {
            console.log(err.message);






        }
    }
}
module.exports = ContenedorFirebase;