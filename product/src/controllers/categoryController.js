import Category from '../models/Category.js';
import validateName from '../utils/nameValidator.js';
import CATEGORY_STATUS from '../constants/categoryStatus.js';

class CategoryController {
  static getAllCategories = (_req, res) => {
    try {
      Category.find((_, categories) => res.status(200).send(categories));
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static getCategoryById = (req, res) => {
    const { id } = req.params;
    try {
      Category.findById(id, (_, category) => {
        if (!category) { return res.status(404).send({ message: 'Category does not exist.' }); }
        return res.status(200).send(category);
      });
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static createCategory = (req, res) => {
    const category = new Category({ ...req.body, status: CATEGORY_STATUS.ACTIVE });
    try {
      if (!validateName(category.name)) { return res.status(400).send({ message: 'Category name must start with a letter and must be at least 4 characters long' }); }

      category.save((_) => res.status(201).json(category));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static updateCategory = (req, res) => {
    const { id } = req.params;
    const updatedCategory = req.body;
    try {
      if (!validateName(updatedCategory.name, !!updatedCategory.name)) { return res.status(400).send({ message: 'Category name must start with a letter and must be at least 4 characters long' }); }

      Category.findByIdAndUpdate(id, updatedCategory, (_) => res.status(200).send('Category succesfully updated!'));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static activateCategory = (req, res) => {
    const { id } = req.params;
    try {
      Category.findByIdAndUpdate(id, { $set: { status: CATEGORY_STATUS.ACTIVE } }, (_) => res.status(200).send('Category succesfully activated!'));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteCategory = (req, res) => {
    const { id } = req.params;
    try {
      Category.findByIdAndDelete(id, (_) => res.status(204).send('Category succesfully deleted!'));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };
}

export default CategoryController;
