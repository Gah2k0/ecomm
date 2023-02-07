import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router
    .get("/api/products", ProductController.getAllProducts)
    .get("/api/products/:id", ProductController.getProductById)
    .post("/api/admin/products", ProductController.createProduct)
    .put("/api/admin/products/:id", ProductController.updateProduct)
    .delete("/api/admin/products/:id", ProductController.deleteProduct)
    
export default router;