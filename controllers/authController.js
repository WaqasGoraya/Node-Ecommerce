import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import sendEmail from "../email/sendConfirmEmail.js";
class authController {
 
  static register = (req, res) => {
    res.render("pages/auth/register", { title: "Register" });
  };
  static saveUser = async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    try {
      if (name && email && password && cpassword) {
        if (password == cpassword) {
          const user = await userModel.findOne({ email: email });
          if (!user) {
            const hash = await bcrypt.hash(password, 12);
            const userDoc = new userModel({
              name: name,
              email: email,
              password: hash,
            });
            const user = await userDoc.save();
            if (user) {
                await sendEmail(user._id,user.email);
              req.flash(
                "success",
                "Registration Success! Please check your email to verify"
              );
              res.redirect("/register");
            } else {
              req.flash("error", "Something went wrong!Please try again");
              req.flash("name", name);
              req.flash("email", email);
              res.redirect("/register");
            }
          } else {
            req.flash("error", "Email already exist!");
            req.flash("name", name);
            req.flash("email", email);
            res.redirect("/register");
          }
        } else {
          req.flash("error", "Password and confirm password not match!");
          req.flash("name", name);
          req.flash("email", email);
          res.redirect("/register");
        }
      } else {
        req.flash("error", "Please Fill all Fields!");
        req.flash("name", name);
        req.flash("email", email);
        res.redirect("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static login = (req, res) => {
    res.render("pages/auth/login", { title: "LogIn" });
  };
  static auth = async (req, res, next) => {
    //    const {email,password} = req.body;
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          res.redirect("/login");
        } else {
          req.logIn(user, (err) => {
            if (err) {
              console.log("Error", err);
              return next(err);
            }
            res.redirect("/");
          });
        }
      })(req, res, next);
    } catch (error) {
      console.log(error);
    }
  };
  static verify = async (req, res) => {
    const { id, token } = req.params;
    const user = await userModel.findById(id);
    try {
          jwt.verify(token, process.env.JWT_SECRET);
          await userModel.findByIdAndUpdate(user._id, { is_verified: true });
          res.redirect("/");
    } catch (error) {
      await sendEmail(id,user.email);
      req.flash("error", 'Link Expired! a new link sent to your email please check and verify..');
      res.redirect("/register");
    }
  };
  static logout = (req, res, next) => {
    req.logout(() => {
      res.redirect("/");
    });
  };
  static profile = (req,res)=> {
    res.render('backend/pages/profile');
  }
}
export default authController;
