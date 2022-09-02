const chatSchema = {
    id: {
        type: 'string', required: true

    },
    mensajes: [{
        _id: false,
        author: {
            name: { type: 'string', required: true },
            lastname: { type: 'string', required: true },
            email: { type: 'string', required: true },
            age: { type: 'number', required: true },
            avatar: { type: 'string', required: true }
        },
        text: {
            type: 'string',
            required: true
        }
      
    }]
}

module.exports = chatSchema