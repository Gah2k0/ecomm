import products from '../models/Product.js';
import validateProduct from '../validations/productValidation.js';

class ProductController {

    static getAllProducts = (req, res) => {
        products.find()
            .populate('category.id')
            .exec((err, products) => {
                if(err){
                    res.status(500).send({message: err.message});
                    return;
                };
                res.status(200).send(products);
            });
    }
    static getProductById = (req, res) => {
        let { id } = req.params;

        products.find()
            .populate('category.id')
            .exec(products.findById(id, (error, product) => {
                    if(!error){
                        res.status(200).send(product);
                    } else {
                        res.status(500).send({message: `${error.message}`});
                    };
                })
            );
    }
    static createProduct =  async (req, res) => {
        let product = new products({...req.body, status: true});
        const productValidationErrors = await validateProduct(product);
        if(productValidationErrors.length > 0){
            res.status(400).send({message: productValidationErrors});
        }
        else{
            product.save((error) => {
                if(error){
                    res.status(500).send({message: `${error.message}`})
                } else {
                    res.status(201).send(product.toJSON())
                };
            });
        };
    }
    static updateProduct = async (req, res) => {
        let { id } = req.params;
        let updatedProduct = req.body;
        const productValidationErrors = await validateProduct(updatedProduct);
        if(productValidationErrors.length > 0){
            res.status(400).send({message: productValidationErrors});
        }
        products.findByIdAndUpdate(id, updatedProduct, (error) => {
            if(!error){
                res.status(200).send("Produto atualizado com sucesso!")
            } else {
                res.status(500).send({message: `${error.message}`})
            };
        });
    }
    static deleteProduct = (req, res) => {
        let { id } = req.params;

        products.findByIdAndDelete(id, (error) => {
            if(!error){
                res.status(204).send("Apagado com sucesso!");
            } else {
                res.status(500).send({message: `${error.message}`});
            };
        });
    }
}

/* function validateProduct(product) {
    const slugRegex = new RegExp(/^[a-zA-Z 0-9\-]*$/);
    const mongoIdRegex = new RegExp(/^[0-9a-fA-F]{24}$/);
    if(!validateName(product.name) || !slugRegex.test(product.slug) || product.unitPrice < 0 || (product.stockQuantity < 0 || product.stockQuantity > 10000) || !mongoIdRegex.test(product.category.id))
        return false;
    
     categories.findById(product.category.id, (error, category) => {   
        console.log(category);
        return category;
    });
}*/

export default ProductController