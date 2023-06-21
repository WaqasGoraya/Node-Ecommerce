import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import subCategoryModel from "../models/subCategoryModel.js";

class homeController {
        static index = async(req,res)  => {
            const categories = await categoryModel.find();
            const products = await productModel.find({is_featured:true});
            res.render('pages/home',{title:'Home',categories:categories,products:products});
        }
        static about = (req,res) => {
            res.render('pages/about',{title:'About'});
        }
        static store = async(req,res) => {
            const products = await productModel.find().populate('category');
            const categories = await categoryModel.find();
            const subcategories = await subCategoryModel.find();
            res.render('pages/store',{title:'Shop',products:products,categories:categories,subcategories:subcategories});
        }
        static singleProduct = async(req,res) => {
            try {
                const{id} = req.params;
                const product = await productModel.findById(id).populate('category');
                res.render('pages/singleProduct',{title:'Product Detail',product:product});
                
            } catch (error) {
                console.log(error);
            }
        }
        static contact = (req,res) => {
            res.render('pages/contact',{title:'Contact'});
        }
}
export default homeController;