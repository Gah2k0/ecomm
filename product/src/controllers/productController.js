import mongoose from 'mongoose';
import Product from '../models/Product.js';
import validateProduct from '../validations/productValidation.js';

class ProductController {
  static getAllProducts = async (_req, res) => {
    try {
      const products = await Product.find()
        .populate('category')
        .exec();
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: 'Invalid Object ID' });
      }
      const product = await Product.findById(id)
        .populate('category')
        .exec();
      if (!product) {
        return res.status(404).send({ message: 'Product does not exist.' });
      }
      return res.status(200).send(product);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static createProduct = async (req, res) => {
    try {
      const product = new Product(req.body);
      const productValidationErrors = await validateProduct(product);
      if (productValidationErrors.length > 0) {
        return res.status(400).send({ message: productValidationErrors });
      }
      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    try {
      const productValidationErrors = await validateProduct(updatedProduct, !!updatedProduct.category, !!updatedProduct.name);
      if (productValidationErrors.length > 0) {
        return res.status(400).send({ message: productValidationErrors });
      }
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: 'Invalid product ID' });
      }
      await Product.findByIdAndUpdate(id, updatedProduct);
      return res.status(200).send('Product succesfully updated!');
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      return res.status(204).send('Product succesfully deleted!');
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };
}

export default ProductController;
