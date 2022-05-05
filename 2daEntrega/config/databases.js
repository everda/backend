const mongoose = require('mongoose');
const database = require('./');

let mongoConnect = (async () => {
    try {
        await mongoose.connect(database.mongo_atlas_uri, {
            useNewUrlParser: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
    }
})();

module.exports = { mongoConnect };
