import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name:{type:String,required:true},
    category:{type:mongoose.Types.ObjectId,ref:'Category'},
    image:{type:String,required:true}
});

const subCategoryModel = mongoose.model('subcategory',subCategorySchema);

export default subCategoryModel;
