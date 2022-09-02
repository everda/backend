const mongoose = require('mongoose');
const winston = require('../utils/loggers/winston');
const database = require('./index.js')

if (database.DB === 'Mongo') {
    let mongoConnect;
    (async () => {
        try {
            await mongoose.connect(database.mongoUrl, {
                useNewUrlParser: true
            });
            // console.log('MongoDB connected');
            winston.consoleLogger.info('MongoDB connected')
        } catch (err) {
            //console.log(err.message);
            winston.errorLogger.error(err.message)
        }
    })();
}

module.exports = {
    mongoose
}