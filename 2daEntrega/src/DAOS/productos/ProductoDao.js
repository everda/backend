const ProductoDaoArchivo = require('./ProductoDaoArchivo')
const ProductoDaoMongo = require('./ProductoDaoMongo')
const ProductoDaoMemoria = require('./ProductoDaoMemoria')
const ProductoDaoFirebase = require('./ProductoDaoFirebase')


if (process.env.DB === 'Mongo') {
    console.log("loaded Mongo product")
    module.exports = ProductoDaoMongo
}
if (process.env.DB === 'Archivo') {
    console.log("loaded Archivo product")
    module.exports = ProductoDaoArchivo
}

if (process.env.DB === 'Memoria') {
    console.log("loaded Memoria product")
    module.exports = ProductoDaoMemoria
}

if (process.env.DB === 'Firebase') {
    console.log("loaded Firebase product")
    module.exports = ProductoDaoFirebase
}

