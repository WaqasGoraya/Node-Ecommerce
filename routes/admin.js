import express from 'express';
import categoryController from '../controllers/categoryController.js';
import productController from '../controllers/productController.js';
import subCategoryController from '../controllers/subCategoryController.js';
import fileStorage from '../config/multerConfig.js';
import upload from '../config/multerConfig.js';
import is_admin from '../middleware/is_admin.js';
const adminRoutes = express.Router();

//group middleware
adminRoutes.use(is_admin);

//Category Routes
adminRoutes.get('/categories', categoryController.categories);
adminRoutes.get('/add-category', categoryController.addCategory);
adminRoutes.post('/add-category',upload, categoryController.saveCategory);
adminRoutes.get('/edit-category/:id', categoryController.editCategory);
adminRoutes.post('/edit-category/:id',upload, categoryController.updateCategory);
adminRoutes.get('/delete-category/:id', categoryController.deleteCategory);

//SubCategories Routes 
adminRoutes.get('/subcategories', subCategoryController.subCategories);
adminRoutes.get('/add-subcategory', subCategoryController.addSubCategory);
adminRoutes.post('/add-subcategory',upload, subCategoryController.saveSubCategory);
adminRoutes.get('/edit-subcategory/:id', subCategoryController.editSubCategory);
adminRoutes.post('/edit-subcategory/:id',upload, subCategoryController.updateSubCategory);
adminRoutes.get('/delete-subcategory/:id', subCategoryController.deleteSubCategory);

//Products Routes
adminRoutes.get('/products',productController.products);
adminRoutes.get('/add-product',productController.addProduct);
adminRoutes.post('/add-product',upload,productController.saveProduct);
adminRoutes.get('/edit-product/:id',productController.editProduct);
adminRoutes.post('/edit-product/:id',upload,productController.updateProduct);
adminRoutes.get('/delete-product/:id',productController.deleteProduct);

export default adminRoutes;