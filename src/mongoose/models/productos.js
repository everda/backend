import mongoose from "mongoose";

const collection = 'productos';

const productsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

const product = mongoose.model(collection, productsSchema);

export default product


