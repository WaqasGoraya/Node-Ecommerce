import express from 'express';
import categoryController from '../controllers/categoryController.js';
import productController from '../controllers/productController.js';
const routes = express.Router();

//Category Routes
routes.get('/categories', categoryController.categories);
routes.get('/add-category', categoryController.addCategory);
routes.get('/edit-category/:id', categoryController.editCategory);
routes.get('/update-category', categoryController.updateCategory);
routes.get('/del-category/:id', categoryController.deleteCategory);

//Products Routes
routes.get('/products',productController.products);
routes.get('/products',productController.products);
routes.get('/products',productController.products);
routes.get('/products',productController.products);
routes.get('/products',productController.products);