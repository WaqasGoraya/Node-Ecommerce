import subCategoryModel from "../models/subCategoryModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
class subCategoryController{
     static subCategories = async(req,res) => {
      const subcategories =  await subCategoryModel.find().populate('category');
      res.render('backend/pages/subCategories/subCategories',{subcategories:subcategories});
    }
    static addSubCategory = async(req,res) => {
        const categories = await categoryModel.find();
      res.render('backend/pages/subCategories/addSubCategory',{categories:categories});
    }
    static saveSubCategory = async(req,res) => {
      try {
        const { categoryName,cat } = req.body;
        const image = req.files.image;
        if(!categoryName || !image){
            req.flash('error','Please enter name and upload image!');
            res.redirect('/admin/add-subcategory');
        }else{
            const cateDoc = new subCategoryModel({
                name:categoryName,
                category:cat,
                image: image[0].filename
            });
            await cateDoc.save();
            req.flash('success','Category added Success!');
            res.redirect('/admin/subcategories');
        }
      } catch (err) {
        console.log(err);
      }
    }
    static editSubCategory = async(req,res) => {
      try {
     const{id} = req.params;
     const category = await subCategoryModel.findById(id).populate('category');
     const parent = await categoryModel.find();
      res.render('backend/pages/subCategories/editsubCategory',{category:category,parent:parent});
      } catch (error) {
        console.log(error);
      }
    }
    static updateSubCategory = async(req,res) => {
      try {
          const {cat_id,old_image,categoryName,cat,} = req.body;
          let updated_image = old_image;
          if(req.files.image){
              updated_image = req.files.image[0].filename;
              fs.unlink(`public/images/${old_image}`,(err)=>{
                if(err){
                  console.log(err);
                }else{
                  console.log('deleted old image');
                }
              });
          }
          const updated_cat = await subCategoryModel.findByIdAndUpdate(cat_id,{
            name:categoryName,
            category:cat,
            image: updated_image
          });
          if(updated_cat){
            req.flash('success','Category Updated Successfully!');
            res.redirect('/admin/subcategories');
          }else{
            req.flash('error','Something went wrong!Please try again');
            res.redirect('/admin/subcategories');
          }
      } catch (error) {
        console.log(error);
      }

    }
    static deleteSubCategory = async(req,res) => {
      try {
        const {id} = req.params;
        const category = await subCategoryModel.findById(id);
        if(category){
          let image = category.image;
          fs.unlink(`public/images/${image}`,(err)=>{
            if(err){
              console.log(err)
            }else{
              console.log('Category Image Deleted!');
            }
          })
        }
        const deleted = await subCategoryModel.findByIdAndDelete(id);
        if(deleted){
          req.flash('success','Category Deleted Successfully!');
          res.redirect('/admin/subcategories');
        }else{
          req.flash('error','Something went wrong!Please try again');
          res.redirect('/admin/subcategories');
        }
      } catch (error) {
        console.log(error);
      }  
    }
}

export default subCategoryController;