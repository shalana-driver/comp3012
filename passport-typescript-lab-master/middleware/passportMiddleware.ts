import { Application } from "express";
import passport from "passport";
import PassportConfig from "./PassportConfig";
const flash = require("express-flash");

import localStrategy from "./passportStrategies/localStrategy";
import passportGitHubStrategy from "./passportStrategies/githubStrategy";

// No need to actually pass the instance of passport since it returns a singleton
const passportConfig = new PassportConfig([localStrategy, passportGitHubStrategy]);
//passportConfig.addStrategies([localStrategy, passportGitHubStrategy]);
const passportMiddleware = (app: Application): void => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
};

export default passportMiddleware;
