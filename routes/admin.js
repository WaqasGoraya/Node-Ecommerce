import express from 'express';
import categoryController from '../controllers/categoryController.js';
import productController from '../controllers/productController.js';
import fileStorage from '../config/multerConfig.js';
import upload from '../config/multerConfig.js';
const adminRoutes = express.Router();

//Category Routes
adminRoutes.get('/categories', categoryController.categories);
adminRoutes.get('/add-category', categoryController.addCategory);
adminRoutes.post('/add-category',upload.single('categoryImg'), categoryController.saveCategory);
adminRoutes.get('/edit-category/:id', categoryController.editCategory);
adminRoutes.get('/update-category', categoryController.updateCategory);
adminRoutes.get('/del-category/:id', categoryController.deleteCategory);

//Products Routes
adminRoutes.get('/products',productController.products);
adminRoutes.get('/products',productController.products);
adminRoutes.get('/products',productController.products);
adminRoutes.get('/products',productController.products);
adminRoutes.get('/products',productController.products);

export default adminRoutes;