import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
class authController {
    static register = (req,res) => {
        res.render('pages/auth/register');
    }
    static saveUser = async (req,res) => {
        const {name,email,password,cpassword} = req.body;
        try {
            if(name && email && password && cpassword){
                if(password == cpassword){
                    const user = await userModel.findOne({email:email});
                if(!user){
                    const hash = await bcrypt.hash(password,12);
                    const userDoc = new userModel({
                        name:name,
                        email:email,
                        password:hash
                    });
                    await userDoc.save();
                    req.flash('success','Registration Success! Please check your email to verify');
                    res.redirect('/register');
                }else{
                    req.flash('error','Email already exist!');
                    res.redirect('/register');
                }
                }else{
                    req.flash('error','Password and confirm password not match!');
                    res.redirect('/register');
                }
            }else{
                req.flash('error','Please Fill all Fields!');
                res.redirect('/register');
            }
        } catch (error) {
            console.log(error);
        }
    }
    static login = (req,res) => {
        res.render('pages/auth/login');
    }
    static auth = async (req,res) => {
        console.log(req.body);
    }
}
export default authController;