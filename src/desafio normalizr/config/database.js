const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err.message);
    }
})();

module.exports = { mongoose };