const express = require('express');
let { connection, mongoose } = require('./config/databases.js');
const app = express();
let { config } = require('./config/');
let { usersSchema } = require('./schemas/userSchema.js');
let modeloUser = mongoose.model('users', usersSchema)

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
}
);

app.get('/', async (req, res, next) => {
    try {
        const response = await modeloUser.find({})
        console.log(response)
        res.send('Hello World');
    }
    catch (err) {
        next(err);
    }

}
);