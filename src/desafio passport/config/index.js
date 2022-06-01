require('dotenv').config();

let config = {
    port: process.env.PORT || 8080,
    secret_key: process.env.SECRET_KEY || 'secret',
    mongoUrl: process.env.MONGO_ATLAS_URI,
    DB: process.env.DB
}

module.exports = config;