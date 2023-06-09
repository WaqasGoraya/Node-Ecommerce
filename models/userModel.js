import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, trim:true},
    is_verified:{type:Boolean, default:false},
    userType:{type:String, default:'2'},
    image:{type:String }
},
{timestamp:true}
);
const userModel = mongoose.model('User',userSchema);

export default userModel;