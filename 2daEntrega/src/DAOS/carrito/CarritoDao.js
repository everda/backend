const CarritoDaoArchivo = require('./CarritoDaoArchivo')
const CarritoDaoMongo = require('./CarritoDaoMongo')
const CarritoDaoMemoria = require('./CarritoDaoMemoria')
const CarritoDaoFirebase = require('./CarritoDaoFirebase')
const config = require('./../../../config')



if (config.database.DB === 'Mongo') {
    console.log("loaded Mongo Cart")

    module.exports = CarritoDaoMongo
}
if (config.database.DB === 'Archivo') {
    console.log("loaded Archivo Cart")
    module.exports = CarritoDaoArchivo
}

if (config.database.DB === 'Memoria') {
    console.log("loaded Memoria Cart")
    module.exports = CarritoDaoMemoria
}

if (config.database.DB === 'Firebase') {
    console.log("loaded Firebase Cart")
    module.exports = CarritoDaoFirebase
}