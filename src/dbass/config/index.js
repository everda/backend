
require('dotenv').config(
    {
        path: __dirname + './../.env'

    }
);




let config = {
    port: process.env.PORT || 3000,
    dev: process.env.NODE_ENV !== 'production',

}

let database = {
    mongo_atlas_uri: process.env.MONGO_ATLAS_URI,
}


let sockets = {
    port: process.env.PORT || 3000,
    dev: process.env.NODE_ENV !== 'production',
}


module.exports = {
    config,
    database,
    sockets
}