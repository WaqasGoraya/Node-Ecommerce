import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
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
        const image = req.files.image;
        if(!categoryName || !image){
            req.flash('error','Please enter name and upload image!');
            res.redirect('/admin/add-category');
        }else{
            const cateDoc = new categoryModel({
                name:categoryName,
                image: image[0].filename
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
      try {
          const {cat_id,old_image,categoryName} = req.body;
          let updated_image = old_image;
          if(req.file){
              updated_image = req.file.filename;
              fs.unlink(`public/images/${old_image}`,(err)=>{
                if(err){
                  console.log(err);
                }else{
                  console.log('deleted old image');
                }
              });
          }
          const updated_cat = await categoryModel.findByIdAndUpdate(cat_id,{
            name:categoryName,
            image: updated_image
          });
          if(updated_cat){
            req.flash('success','Category Updated Successfully!');
            res.redirect('/admin/categories');
          }else{
            req.flash('error','Something went wrong!Please try again');
            res.redirect('/admin/categories');
          }
      } catch (error) {
        console.log(error);
      }

    }
    static deleteCategory = async(req,res) => {
      try {
        const {id} = req.params;
        const category = await categoryModel.findById(id);
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
        const deleted = await categoryModel.findByIdAndDelete(id);
        if(deleted){
          req.flash('success','Category Deleted Successfully!');
          res.redirect('/admin/categories');
        }else{
          req.flash('error','Something went wrong!Please try again');
          res.redirect('/admin/categories');
        }
      } catch (error) {
        console.log(error);
      }  
    }
}

export default categoryController;