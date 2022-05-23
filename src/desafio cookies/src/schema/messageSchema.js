const messageSchema = {
    id: {
        type: 'string',
        required: true
    },
    mensajes: [{
        author: {
            id: { type: 'string', required: true },
            nombre: { type: 'string', required: true },
            apellido: { type: 'string', required: true },
            edad: { type: 'number', required: true },
            alias: { type: 'string', required: true },
            avatar: { type: 'string', required: true }
        },
        text: {
            type: 'string',
            required: true
        }
    }]
}