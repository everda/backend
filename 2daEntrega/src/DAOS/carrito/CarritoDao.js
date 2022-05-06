const CarritoDaoArchivo = require('./CarritoDaoArchivo')
const CarritoDaoMongo = require('./CarritoDaoMongo')
const CarritoDaoMemoria = require('./CarritoDaoMemoria')


if (process.env.DB === 'Mongo') {
    console.log("loaded Mongo Cart")
    module.exports = CarritoDaoMongo
}
if (process.env.DB === 'Archivo') {
    console.log("loaded Archivo Cart")
    module.exports = CarritoDaoArchivo
}

if (process.env.DB === 'Memoria') {
    console.log("loaded Memoria Cart")
    module.exports = CarritoDaoMemoria
}

if (process.env.DB === 'Firebase') {
    console.log("loaded Firebase Cart")
    module.exports = CarritoDaoFirebase
}