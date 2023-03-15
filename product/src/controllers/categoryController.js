import Category from '../models/Category.js';
import validateName from '../utils/nameValidator.js';
import CATEGORY_STATUS from '../constants/categoryStatus.js';

class CategoryController {
  static getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).send({ message: 'Category does not exist.' });
      }
      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static createCategory = async (req, res) => {
    const category = new Category({ ...req.body, status: CATEGORY_STATUS.ACTIVE });
    try {
      if (!validateName(category.name)) {
        return res.status(400).send({ message: 'Category name must start with a letter and must be at least 4 characters long' });
      }

      await category.save();
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static updateCategory = async (req, res) => {
    const { id } = req.params;
    const updatedCategory = req.body;
    try {
      if (!validateName(updatedCategory.name, !!updatedCategory.name)) {
        return res.status(400).send({ message: 'Category name must start with a letter and must be at least 4 characters long' });
      }

      await Category.findByIdAndUpdate(id, updatedCategory);
      return res.status(200).send('Category succesfully updated!');
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static activateCategory = async (req, res) => {
    const { id } = req.params;
    try {
      await Category.findByIdAndUpdate(id, { $set: { status: CATEGORY_STATUS.ACTIVE } });
      return res.status(200).send('Category succesfully activated!');
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      await Category.findByIdAndDelete(id);
      return res.status(204).send('Category succesfully deleted!');
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };
}

export default CategoryController;
