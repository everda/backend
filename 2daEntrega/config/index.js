const path = require('path');
require('dotenv').config(
    {
        path: path.resolve(__dirname, '../.env')

    }
);


let config = {
    port: process.env.PORT ,
    dev: process.env.NODE_ENV !== 'production',
    path: path.resolve(__dirname, '../.env')
}

let database = {
    mongo_atlas_uri: process.env.MONGO_ATLAS_URI,
}


module.exports = {
    config,
    database
}