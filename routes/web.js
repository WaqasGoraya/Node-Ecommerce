import express from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import {ensureAuthenticated, forwardAuthenticated} from '../middleware/auth.js';
const router = express.Router();

router.get('/',homeController.index);
router.get('/about',homeController.about);
router.get('/shop',homeController.store);
router.get('/product/:id',homeController.singleProduct);
router.get('/contact',homeController.contact);

//Auth Routes
router.get('/register', forwardAuthenticated, authController.register);
router.post('/register',authController.saveUser);
router.get('/login',forwardAuthenticated, authController.login);
router.post('/login',authController.auth);
router.post('/logout',authController.logout);
router.get('/verify/:id/:token',authController.verify);

//profile
router.get('/profile',ensureAuthenticated,authController.profile);
export default router;