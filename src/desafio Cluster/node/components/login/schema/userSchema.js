const userSchema = {

    id: {
        type: 'number',
        required: true
    },
    timestamp: {
        type: 'date',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    lastname: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }


}


module.exports = { userSchema };