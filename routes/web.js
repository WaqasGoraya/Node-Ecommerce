import express from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
const router = express.Router();

router.get('/',homeController.index);
router.get('/about',homeController.about);
router.get('/shop',homeController.store);
router.get('/contact',homeController.contact);

//Auth Routes
router.get('/register',authController.register);
router.post('/register',authController.saveUser);
router.get('/login',authController.login);
router.post('/login',authController.auth);
export default router;