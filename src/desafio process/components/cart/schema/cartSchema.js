const cartSchema = {

    id: {
        type: 'number',
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

module.exports = { cartSchema };