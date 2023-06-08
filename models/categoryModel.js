import mongoose, { Schema } from "mongoose";

const categorySchema = mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    product:[{type: Schema.Types.ObjectId,ref:'Product'}]
},{timestamp:true});

const categoryModel = mongoose.model('Category',categorySchema);

export default categoryModel;