const {  mongoose } = require('./../../config/databases.js');
const winston = require('../utils/loggers/winston')

class ContenedorMongo {
    constructor(schema, collection) {
        this.schema = schema;
        this.collection = collection;
        this.model = mongoose.model(this.collection, this.schema);

    }


    async getData() {
        try {
            console.log(await this.model.find({}))

            // let data = await mongoose.mongoConnect
            // return response.Json();
        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }
}

module.exports = ContenedorMongo;

