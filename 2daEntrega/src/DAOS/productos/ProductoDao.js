const ProductoDaoArchivo = require('./ProductoDaoArchivo')
const ProductoDaoMongo = require('./ProductoDaoMongo')
const ProductoDaoMemoria = require('./ProductoDaoMemoria')
const ProductoDaoFirebase = require('./ProductoDaoFirebase')
const config = require('./../../../config')



if (config.database.DB === 'Mongo') {
    console.log("loaded Mongo product")
    module.exports = ProductoDaoMongo
}
if (config.database.DB === 'Archivo') {
    console.log("loaded Archivo product")
    module.exports = ProductoDaoArchivo
}

if (config.database.DB === 'Memoria') {
    console.log("loaded Memoria product")
    module.exports = ProductoDaoMemoria
}

if (config.database.DB === 'Firebase') {
    console.log("loaded Firebase product")
    module.exports = ProductoDaoFirebase
}

