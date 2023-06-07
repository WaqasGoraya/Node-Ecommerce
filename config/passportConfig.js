import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";

const passportLocal = async () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await userModel.findOne({ email: email });
        if (!user) {
          return done(null, false, { error: "Incorrect Email or password." });
        }
        const isMatch = await bcrypt.compare(user.password, password);
        if (!isMatch) {
          return done(null, false, { error: "Incorrect Email or password!" });
          }
          return done(null, user);
      }
    )
  );
};
