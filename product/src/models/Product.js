import mongoose from 'mongoose';

const productSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        slug: {type: String, required: true},
        unitPrice: {type: Number, required: true},
        stockQuantity: {type: Number},
        category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    }
)

const Product = mongoose.model('Product', productSchema);

export default Product;