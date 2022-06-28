const { mongoose } = require('../config/database.js');
const winston = require('../utils/loggers/winston')

class MongoModel {
    constructor(schema, collection) {
        this.schema =  schema;
        this.collection = collection;
        this.model = mongoose.model(this.collection, this.schema);
        


    }


    async getData() {
        try {
            return await this.model.find({})

            // let data = await mongoose.mongoConnect
            // return response.Json();
        }
        catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async insertSomething() {
        try {
            await this.model.create({
                name: 'Hafez',
                age: 25,
                country: 'Egypt'
            })

        }
        catch (error){
            console.log(error)
        }
        
    }

}

module.exports = MongoModel;
