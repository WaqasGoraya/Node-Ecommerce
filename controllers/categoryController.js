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
        if(!categoryName || !image){
            req.flash('error','Please enter name and upload image!');
            res.redirect('/admin/add-category');
        }else{
            const cateDoc = new categoryModel({
                name:categoryName,
                image: req.file.filename
            });
            await cateDoc.save();
            req.flash('success','Category added Success!');
            res.redirect('/admin/categories');
        }
        
   
      } catch (err) {
        console.log(err)
      }
    }
    static editCategory = async(req,res) => {
      try {
           const{id} = req.params;
     const category = await categoryModel.findById(id);
      res.render('backend/pages/categories/editCategory',{category:category});
      } catch (error) {
        console.log(error);
      }
    }
    static updateCategory = async(req,res) => {
      console.log(req.body);
      try {
          const {cat_id,old_image,categoryName} = req.body;
          if(req.file){
              old_image = req.file.filename;
              
          }
      } catch (error) {
        console.log(error);
      }

    }
    static deleteCategory = async(req,res) => {
        
    }
}

export default categoryController;