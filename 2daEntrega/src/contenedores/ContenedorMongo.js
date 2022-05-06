const { mongoConnect, mongoose } = require('./../../config/databases.js');


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
            console.log(error)
        }
    }
}

module.exports = ContenedorMongo;

