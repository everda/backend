const config = require('../../../config/index')



if (config.DB === 'Mongo') {
    const CarritoDaoMongo = require('./CarritoDaoMongo')
    //console.log("loaded Mongo Cart")

    module.exports = CarritoDaoMongo
}