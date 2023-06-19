import express from 'express';
import categoryController from '../controllers/categoryController.js';
import productController from '../controllers/productController.js';
import fileStorage from '../config/multerConfig.js';
import upload from '../config/multerConfig.js';
import is_admin from '../middleware/is_admin.js';
const adminRoutes = express.Router();

//group middleware
adminRoutes.use(is_admin);

//Category Routes
adminRoutes.get('/categories', categoryController.categories);
adminRoutes.get('/add-category', categoryController.addCategory);
adminRoutes.post('/add-category',upload.single('categoryImg'), categoryController.saveCategory);
adminRoutes.get('/edit-category/:id', categoryController.editCategory);
adminRoutes.post('/edit-category/:id',upload.single('categoryImg'), categoryController.updateCategory);
adminRoutes.get('/delete-category/:id', categoryController.deleteCategory);

//Products Routes
adminRoutes.get('/products',productController.products);
adminRoutes.get('/add-product',productController.addProduct);
adminRoutes.post('/add-product',productController.saveProduct);
adminRoutes.get('/edit-product/:id',productController.editProduct);
adminRoutes.post('/edit-product/:id',productController.updateProduct);
adminRoutes.get('/delete-product',productController.deleteProduct);

export default adminRoutes;