import categoryModel from "../models/categoryModel.js";
class categoryController{
     static categories = async(req,res) => {
      const categories =  await categoryModel.find();
      res.render('backend/pages/categories/categories');
    }
    static addCategory = async(req,res) => {

    }
    static editCategory = async(req,res) => {

    }
    static updateCategory = async(req,res) => {

    }
    static deleteCategory = async(req,res) => {
        
    }
}

export default categoryController;