import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";
const flash = require('connect-flash');

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { message: req.flash("error") });
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
    failureMessage: "Invalid email or password"
    /* FIXED: 😭 failureMsg needed when login fails */
    
  })
)

router.get("/logout", (req, res) => {
  
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/auth/login',
    successRedirect: '/dashboard'
  }),
  function(req, res) {
    res.redirect('/dashboard');
  });

export default router;
