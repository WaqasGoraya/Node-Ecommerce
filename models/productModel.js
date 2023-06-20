import mongoose,{Schema} from "mongoose";

const productSchema = mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    image:{type:String,required:true},
    gallery:[{type:String}],
    category:{type: mongoose.Types.ObjectId, ref:'Category'},
    desc:{type:String},
    is_featured:{type:Boolean, default:false}
},
{timestamp:true}
);

const productModel = mongoose.model('Product',productSchema);

export default productModel;