import categoryModel from "../models/categoryModel.js";
class categoryController{
     static categories = async(req,res) => {
      const categories =  await categoryModel.find();
      res.render('backend/pages/categories/categories',{categories:categories});
    }
    static addCategory = async(req,res) => {
      res.render('backend/pages/categories/addCategory');
    }
    static saveCategory = async(req,res) => {
      try {
        const { categoryName } = req.body;
        const image = req.file;
        
   
      } catch (err) {
        console.log(err)
      }
    
        // if(categoryName && image){

        // }else{
        //   req.flash('error','Enter name and upload image to proceed!');
        //   res.redirect('/admin/add-category');
        // }
    }
    static editCategory = async(req,res) => {

    }
    static updateCategory = async(req,res) => {

    }
    static deleteCategory = async(req,res) => {
        
    }
}

export default categoryController;