import categories from '../models/Category.js';
import validateName from '../utils/nameValidator.js'

class CategoryController {

    static getAllCategories = (req, res) => {
        categories.find((err, categories) => {
            if(err){
                res.status(500).send({message: err.message});
                return;
            };
            res.status(200).send(categories);
        });
    }
    static getCategoryById = (req, res) => {
        let { id } = req.params;

        categories.findById(id, (error, category) => {
            if(!error){
                res.status(200).send(category);
            } else {
                res.status(500).send({message: `${error.message}`});
            };
        });
    }
    static createCategory = (req, res) => {
        let category = new categories({...req.body, status: true});

        if(!validateName(category.name)){
            res.status(400).send({message: "Nome da categoria não pode começar com números e precisa ter mais de 3 caracteres."});
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
            return res.status(400).send({message: "Nome da categoria não pode começar com números e precisa ter mais de 3 caracteres."});
        }

        categories.findByIdAndUpdate(id, updatedCategory, (error) => {
            if(!error){
                res.status(200).send("Categoria atualizada com sucesso!")
            } else {
                res.status(500).send({message: `${error.message}`})
            };
        });
    }
    static activateCategory = (req, res) => {
        let { id } = req.params;

        categories.findByIdAndUpdate(id, {$set: {status: true}}, (error) => {
            if(!error){
                res.status(200).send("Categoria ativada com sucesso!")
            } else {
                res.status(500).send({message: `${error.message}`})
            };
        });
    }
    static deleteCategory = (req, res) => {
        let { id } = req.params;

        categories.findByIdAndDelete(id, (error) => {
            if(!error){
                res.status(204).send("Apagado com sucesso!");
            } else {
                res.status(500).send({message: `${error.message}`});
            };
        });
    }
}

export default CategoryController