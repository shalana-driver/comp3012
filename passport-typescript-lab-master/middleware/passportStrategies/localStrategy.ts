import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getGithubUserById, getUserByEmailIdAndPassword, getUserById, isUserValid} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = getUserByEmailIdAndPassword(email, password);
    if (user) {
      if (isUserValid(user,password)) {
        return done(null, user)
      }
      else {
        return done(null, false, {

          message: `Password is incorrect`,
        });
      }
    }
    else {
      done(null, false, {

        message: `Couldn't find user with email: ${email}`,
      });
    }
  }
);

/*
FIXED (types) 😭
*/
passport.serializeUser(function (user: Express.User, done: (err: Error | null, id?: number) => void)  {
  done(null, user.id);
});

/*
FIXED (types) 😭
*/
passport.deserializeUser(function (id: number| string, done: (err: Object | null, user?: false | Express.User | null | undefined) => void) {
  let user = null;
  if (typeof id === "string") {
    user = getGithubUserById(id);
  } else {
    user = getUserById(id);
  }
  
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
