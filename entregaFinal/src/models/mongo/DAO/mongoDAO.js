const { mongoose } = require('../../../config/database');
const winston = require('../../../utils/loggers/winston')

class MongoModel {
    constructor(schema, collection) {
        this.schema = schema;
        this.collection = collection;
        this.model = mongoose.model(this.collection, this.schema);



    }


    async getData() {
        try {
            return await this.model.find({})

        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }

}

module.exports = MongoModel;
