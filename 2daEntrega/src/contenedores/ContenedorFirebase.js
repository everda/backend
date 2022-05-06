const admin = require('firebase-admin');
let serviceAccount = require("../../config/curso-backend-a6efd-firebase-adminsdk-8pu1r-2b4047943f.json");

class ContenedorFirebase {
    constructor(collection) {


        this.collection = collection;
        this.model = this.admin.database().ref(this.collection);
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