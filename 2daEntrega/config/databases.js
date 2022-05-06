const mongoose = require('mongoose');
var admin = require("firebase-admin");
const database = require('./');
var serviceAccount = require("./curso-backend-a6efd-firebase-adminsdk-8pu1r-2b4047943f.json");

 admin.initializeApp({
     credential: admin.credential.cert(serviceAccount)
 });

console.log('base firabase conectada')

let mongoConnect;
(async () => {
    try {
        await mongoose.connect(database.database.mongo_atlas_uri, {
            useNewUrlParser: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
    }
})();





module.exports = { mongoConnect, mongoose };





