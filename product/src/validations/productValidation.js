import mongoose from "mongoose";
import validateName from '../utils/nameValidator.js';
import categories from '../models/Category.js';

async function validateProduct(product) {
    const slugRegex = new RegExp(/^[a-zA-Z 0-9\-]*$/);
    const errors = [];
    if(!validateName(product.name))
        errors.push('Product name must start with a letter and must contain more than 3 characters.');
    if(!slugRegex.test(product.slug))
        errors.push('Product slug must contain only letters, numbers and hifens.');
    if( product.unitPrice <= 0 )
        errors.push('Unit price must be higher than 0');
    if(product.stockQuantity <= 0 || product.stockQuantity >= 10000)
        errors.push('Stock quantity must be higher than 0 and lower than 10000');
    if(!mongoose.isValidObjectId(product.category.id))
        errors.push('Category Id is invalid');
    const category = await categories.findOne({_id: product.category.id});
    if(!category)
        errors.push('Provided category does not exist');
    return errors;
}

export default validateProduct;