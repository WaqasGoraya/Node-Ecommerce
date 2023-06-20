import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

class homeController {
        static index = async(req,res)  => {
            const categories = await categoryModel.find();
            const products = await productModel.find({is_featured:true});
            res.render('pages/home',{title:'Home',categories:categories,products:products});
        }
        static about = (req,res) => {
            res.render('pages/about',{title:'About'});
        }
        static store = (req,res) => {
            res.render('pages/store',{title:'Shop'});
        }
        static singleProduct = async(req,res) => {
            try {
                
            } catch (error) {
                console.log(error);
            }
        }
        static contact = (req,res) => {
            res.render('pages/contact',{title:'Contact'});
        }
}
export default homeController;