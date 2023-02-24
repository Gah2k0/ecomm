import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    status: { type: Boolean },
  },
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
