import mongoose from 'mongoose';

const productSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        slug: {type: String, required: true},
        unitPrice: {type: Number, required: true},
        stockQuantity: {type: Number},
        category: { 
            id: {type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true} },
    }
)

const products = mongoose.model('products', productSchema);

export default products;