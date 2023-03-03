import mongoose from 'mongoose';
import Product from '../models/Product.js';
import validateProduct from '../validations/productValidation.js';

class ProductController {
  static getAllProducts = (_req, res) => {
    try {
      Product.find()
        .populate('category')
        .exec((_, products) => res.status(200).send(products));
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static getProductById = (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.isValidObjectId(id)) { return res.status(400).send({ message: 'Invalid Object ID' }); }

      Product.findById(id)
        .populate('category')
        .exec((_, product) => {
          if (!product) { return res.status(404).send({ message: 'Product does not exist.' }); }

          return res.status(200).send(product);
        });
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static createProduct = async (req, res) => {
    try {
      const product = new Product(req.body);
      const productValidationErrors = await validateProduct(product);
      if (productValidationErrors.length > 0) {
        return res.status(400).send({ message: productValidationErrors });
      }
      product.save((_) => res.status(201).json(product));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
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
      if (!mongoose.isValidObjectId(id)) { return res.status(400).send({ message: 'Invalid product ID' }); }

      Product.findByIdAndUpdate(id, updatedProduct, (_) => res.status(200).send('Product succesfully updated!'));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteProduct = (req, res) => {
    const { id } = req.params;
    try {
      Product.findByIdAndDelete(id, (_) => res.status(204).send('Product succesfully deleted!'));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };
}

export default ProductController;
