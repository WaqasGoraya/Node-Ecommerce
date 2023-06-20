import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import fs from 'fs';
class productController{
    static products = async (req,res) => {
        try {
              const products = await productModel.find().populate('category');
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
        try {
            const {pname,pprice,qty,p_cat,pdesc,feature} = req.body;
            const {image,gallery} = req.files;
            const GImages = [];
            let productImg;
            var featured = false; 
            if(pname && pprice && qty && p_cat && pdesc){
                if(!image){
                    req.flash('error','Please upload product image');
                    res.redirect('/admin/add-product');
                }else{
                    productImg = image[0].filename;
                }
                if(gallery){
                      gallery.forEach((image)=>{
                          GImages.push(image.filename);
                      });
                }
                if(feature){
                    featured = true;
                }
                const productDoc = new productModel({
                    name:pname,
                    price:pprice,
                    stock:qty,
                    category:p_cat,
                    desc:pdesc,
                    image:productImg,
                    gallery:GImages,
                    feature:featured
                });
                await productDoc.save();
                req.flash('success','product added successfully!');
                res.redirect('/admin/products');
            }else{
                req.flash('error','Please fill all fields!');
                res.redirect('/admin/add-product');
            }
        } catch (error) {
            console.log(error);
        }
    }
    static editProduct = async(req,res) => {
        try {
            const{id} = req.params;
            const product = await productModel.findById(id).populate('category');
            const category = await categoryModel.find();
            res.render('backend/pages/products/editProducts',{product:product,category:category});
        } catch (error) {
            console.log(error);
        }
    }
    static updateProduct = async(req,res) => {
        try {
            const{pid,old_image,pname,pprice,qty,p_cat,pdesc,feature} = req.body;
            let image = old_image;
            var featured = false; 
            if(req.files.image){
                image = req.files.image[0].filename;
                fs.unlink(`public/images/${old_image}`,(err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Image Deleted');
                    }
                });
            }
             if(feature){
                    featured = true;
                }
            const updated = await productModel.findByIdAndUpdate(pid,{
                    name:pname,
                    price:pprice,
                    stock:qty,
                    category:p_cat,
                    desc:pdesc,
                    image:image,
                    feature:featured
            });
            if(updated){
                req.flash('success','Product Updated Successfully!');
                res.redirect('/admin/products');
            }else{
                 req.flash('error','Something went wrong!');
                 res.redirect('/admin/products');
            }
        } catch (error) {
            console.log(error);
        }
    }
    static deleteProduct = async(req,res) => {
        try {
            const {id} = req.params;
           const product = await productModel.findById(id);
           if(product){
                let image = product.image;
                fs.unlink(`public/images/${image}`,(err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Image Deleted');
                    }
                });
           }
          const deleted = await productModel.findByIdAndDelete(id);
          if(deleted){
            req.flash('success','Product Deleted Successfully!');
            res.redirect('/admin/products');
          }else{
            req.flash('error','Something went wrong!');
            res.redirect('/admin/edit-product');
          }
        } catch (error) {
            console.log(error);
        }
    }
}
export default productController;