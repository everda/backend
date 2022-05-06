const mongoose = require('mongoose');
let database = require('./')

console.log(database)

let connection;
(async () => {
    try {
        connection = await mongoose.connect(process.env.MONGO_ATLAS_URI, {
            useNewUrlParser: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
    }
})();


module.exports = { connection, mongoose }