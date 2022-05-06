const cartSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            required: true
        },
        timestamp: {
            type: 'string',
            required: true
        },
        products: {
            type: 'array',
            required: true
        }

    }
}

module.exports = { cartSchema };