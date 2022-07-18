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
    direccion: {
        type: 'string',
        required: true
    },
    edad: {
        type: 'number',
        required: true
    },
    prefijo: {
        type: 'string',
        required: true
    },
    numero: {
        type: 'string',
        required: true
    },
    foto: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }


}


module.exports = { userSchema };