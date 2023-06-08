import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type: Schema.Types.ObjectId, ref:'Category'}
},
{timestamp:true}
);

const productModel = mongoose.model('Product',productSchema);

export default productModel;