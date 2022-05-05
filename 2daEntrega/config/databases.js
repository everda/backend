const mongoose = require('mongoose');
const firebase = require('firebase');
const database = require('./');

let mongoConnect = (async () => {
    try {
        await mongoose.connect(database.mongo_atlas_uri, {
            useNewUrlParser: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
    }
})();

let firebaseConnect = (async () => {

    try {



module.exports = { mongoConnect };


var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});