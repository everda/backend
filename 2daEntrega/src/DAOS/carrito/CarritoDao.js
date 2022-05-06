const CarritoDaoArchivo = require('./CarritoDaoArchivo')
const CarritoDaoMongo = require('./CarritoDaoMongo')

console.log(process.env.DB)
if (process.env.DB === 'Mongo') {
    console.log("loaded Mongo")
    module.exports = CarritoDaoMongo
}
if (process.env.DB === 'Archivo') {
    console.log("loaded Archivo")
    module.exports = CarritoDaoArchivo
}
