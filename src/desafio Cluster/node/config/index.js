require('dotenv').config();
let args = process.argv.slice(2)
console.log(args);
let config = {

    port: args[1] || process.env.PORT || 8080,
    secret_key: process.env.SECRET_KEY || 'secret',
    mongoUrl: process.env.MONGO_ATLAS_URI || 'mongodb+srv://root:root@cluster0.5dnqz.mongodb.net/everdadb?retryWrites=true&w=majority',
    DB: process.env.DB || 'Mongo',
    cluster_mode: args[0] || 'FORK'

}

module.exports = config;