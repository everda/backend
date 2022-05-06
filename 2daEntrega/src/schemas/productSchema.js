const productSchema = {
    id: {
        type: 'number',
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    code: {
        type: 'string',
        required: true
    },
    thumbnail: {
        type: 'string',
        required: true
    },
    price: {
        type: 'number',
        required: true
    },
    stock: {
        type: 'number',
        required: true
    }

}



module.exports = { productSchema };