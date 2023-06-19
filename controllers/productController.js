import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
class productController{
    static products = async (req,res) => {
        try {
              const products = await productModel.find();
              res.render('backend/pages/products/products',{products:products});
        } catch (error) {
            console.log(error);
        }
    }
    static addProduct = async(req,res) => {
        try {
            const category = await categoryModel.find();
            res.render('backend/pages/products/addProduct',{category:category});
        } catch (error) {
            console.log(error)
        }
        
    }
    static saveProduct = async(req,res) => {

    }
    static editProduct = async(req,res) => {

    }
    static updateProduct = async(req,res) => {

    }
    static deleteProduct = async(req,res) => {
        
    }
}
export default productController;