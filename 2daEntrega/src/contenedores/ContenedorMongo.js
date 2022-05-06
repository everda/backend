//const { mongoConnect, mongoose } = require('./../../config/databases.js');
const mongoose = require('mongoose');
const database = require('../../config/');


class ContenedorMongo {
    constructor(schema, collection) {
        
        (async () => {
            try {
                
                await mongoose.connect(database.database.mongo_atlas_uri, {
                    useNewUrlParser: true
                });
                console.log('MongoDB connected');
            } catch (err) {
                console.log(err.message);
            }
        })
        
        this.schema = schema;
        this.collection = collection;
        this.model = mongoose.model(this.collection, this.schema);
    }

    async connect() {
        try {
            await mongoose.connect(database.database.mongo_atlas_uri, {
                useNewUrlParser: true
            });
            console.log('MongoDB connected');
        } catch (err) {
            console.log(err.message);
        }
    }

    async disconnect() {
        await mongoose.disconnect();
        console.log(('MongoDB disconnected'));
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

