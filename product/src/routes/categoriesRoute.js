import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();

router
    .get("/api/categories", CategoryController.getAllCategories)
    .get("/api/categories/:id", CategoryController.getCategoryById)
    .post("/api/admin/categories", CategoryController.createCategory)
    .patch("/api/admin/categories/:id", CategoryController.activateCategory)
    .put("/api/admin/categories/:id", CategoryController.updateCategory)
    .delete("/api/admin/categories/:id", CategoryController.deleteCategory)
    
export default router;