require('dotenv').config();

let config = {
    port: process.env.PORT || 8080,
    secret_key: process.env.SECRET_KEY || 'secret',
    mongoUrl: process.env.MONGO_ATLAS_URI || 'mongodb+srv://root:root@cluster0.5dnqz.mongodb.net/everdadb?retryWrites=true&w=majority',
    DB: process.env.DB || 'Mongo'
}

module.exports = config;