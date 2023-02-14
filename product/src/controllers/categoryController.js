import Category from '../models/Category.js';
import validateName from '../utils/nameValidator.js'

class CategoryController {

    static getAllCategories = (_req, res) => {
        Category.find((err, categories) => {
            if(err){
                res.status(500).send({message: err.message});
                return;
            };
            res.status(200).send(categories);
        });
    }
    static getCategoryById = (req, res) => {
        let { id } = req.params;

        Category.findById(id, (error, category) => {
            if(!error && category){
                res.status(200).send(category);
            } 
            else if(!error && !category){
                res.status(404).send({message: 'Category does not exist.'})
            } 
            else {
                res.status(500).send({message: `${error.message}`});
            };
        });
    }
    static createCategory = (req, res) => {
        let category = new Category({...req.body, status: true});

        if(!validateName(category.name)){
            res.status(400).send({message: "Category name must start with a letter and must be at least 4 characters long"});
        }
        else{
            category.save((error) => {
                if(error){
                    res.status(500).send({message: `${error.message}`})
                } else { 
                    res.status(201).send(category.toJSON())
                };
            });
        };
    }
    static updateCategory = (req, res) => {
        let { id } = req.params;
        let updatedCategory = req.body;

        if(!validateName(updatedCategory.name)){
            return res.status(400).send({message: "Category name must start with a letter and must be at least 4 characters long"});
        }

        Category.findByIdAndUpdate(id, updatedCategory, (error) => {
            if(!error){
                res.status(200).send("Category succesfully updated!")
            } else {
                res.status(500).send({message: `${error.message}`})
            };
        });
    }
    static activateCategory = (req, res) => {
        let { id } = req.params;

        Category.findByIdAndUpdate(id, {$set: {status: true}}, (error) => {
            if(!error){
                res.status(200).send("Category succesfully activated!")
            } else {
                res.status(500).send({message: `${error.message}`})
            };
        });
    }
    static deleteCategory = (req, res) => {
        let { id } = req.params;

        Category.findByIdAndDelete(id, (error) => {
            if(!error){
                res.status(204).send("Category succesfully deleted!");
            } else {
                res.status(500).send({message: `${error.message}`});
            };
        });
    }
}

export default CategoryController