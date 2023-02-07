import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema (
    {
        id: {type: String},   
        name: {type: String, required: true},   
        status: {type: Boolean},   
    }
)

const categories = mongoose.model('categories', categorySchema);

export default categories;