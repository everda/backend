const mongoose = require('mongoose');
const database = require('./index.js')

if (database.DB === 'Mongo') {
    let mongoConnect;
    (async () => {
        try {
            await mongoose.connect(database.mongoUrl, {
                useNewUrlParser: true
            });
            console.log('MongoDB connected');
        } catch (err) {
            console.log(err.message);
        }
    })();
}

module.exports = {
    mongoose
}