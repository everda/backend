require('dotenv').config();
let args = process.argv.slice(2)
let config = {

    port: args[0] || process.env.PORT || 8080,
    secret_key: process.env.SECRET_KEY || 'secret',
    mongoUrl: process.env.MONGO_ATLAS_URI || 'mongodb+srv://root:root@cluster0.5dnqz.mongodb.net/everdadb?retryWrites=true&w=majority',
    DB: process.env.DB || 'Mongo',
    cluster_mode: args[1] || 'FORK',
    dev: process.env.NODE_ENV != 'production'

}

module.exports = config;