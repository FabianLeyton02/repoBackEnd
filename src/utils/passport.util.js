import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "../models/user.models.js";
import * as UserService from "../services/user.service.js";
import * as AuthService from "../services/auth.service.js";

passport.serializeUser(function (user, done) {
  console.log("Serializing");
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  console.log("Deserializing");
  UserModel.findById(_id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "signup",
  new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const userExist = await UserModel.findOne({ email: username });
        if (userExist) {
          return done("El usuario ya existe", false);
        } else {
          const user = await UserService.createUser(req.body);
          return done(null, user);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const login = await AuthService.login(username, password);
        if (login) {
          const user = await UserModel.findOne({ email: username });
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

export default passport;
