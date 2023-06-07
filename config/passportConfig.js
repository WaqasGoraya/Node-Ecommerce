import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";

const passportLocal = async (passport) => {
  try{
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await userModel.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect Email or password." });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect Email or password!" });
          }
          return done(null, user,{message:'LoggedIn Successfully!'});
      }
    )
  );
    }catch(error){
      console.log(error);
    }
            passport.serializeUser((user, done)=> {
              done(null, user.id);
        });

          passport.deserializeUser((id, done) => {
             const user =  userModel.findById(id);
              done(null,user) 
          });
};
export default passportLocal;