import express from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import guest from '../middleware/guest.js';
const router = express.Router();

router.get('/',homeController.index);
router.get('/about',homeController.about);
router.get('/shop',homeController.store);
router.get('/contact',homeController.contact);

//Auth Routes
router.get('/register', guest, authController.register);
router.post('/register',authController.saveUser);
router.get('/login',guest, authController.login);
router.post('/login',authController.auth);
router.post('/logout',authController.logout);

router.get('/verify/:id/:token',authController.verify);
export default router;