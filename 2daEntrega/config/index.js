const path = require('path');
require('dotenv').config(
    {
        path: path.resolve(__dirname, '../.env')

    }
);


let config = {
    port: process.env.PORT,
    dev: process.env.NODE_ENV !== 'production',
    paths: {
        productFile: path.resolve(__dirname, '../files/productos.txt'),
        cartFile: path.resolve(__dirname, '../files/carrito.txt')
    }
}

let database = {
    mongo_atlas_uri: process.env.MONGO_ATLAS_URI,
    DB: process.env.DB
}


module.exports = {
    config,
    database
}