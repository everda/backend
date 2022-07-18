const config = require('../../../config/index')



if (config.DB === 'Mongo') {
    const CarritoDaoMongo = require('./CarritoDaoMongo')
    //console.log("loaded Mongo Cart")

    module.exports = CarritoDaoMongo
}
if (config.DB === 'Archivo') {
    const CarritoDaoArchivo = require('./CarritoDaoArchivo')
    //console.log("loaded Archivo Cart")
    module.exports = CarritoDaoArchivo
}

if (config.DB === 'Memoria') {
    const CarritoDaoMemoria = require('./CarritoDaoMemoria')
    //console.log("loaded Memoria Cart")
    module.exports = CarritoDaoMemoria
}

if (config.DB === 'Firebase') {
    const CarritoDaoFirebase = require('./CarritoDaoFirebase')
   // console.log("loaded Firebase Cart")
    module.exports = CarritoDaoFirebase
}