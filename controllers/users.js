const User = require("../models/user.js");


module.exports.signup = async (req, res) => {
          try {
                    let { username, email, password } = req.body;
                    const newUser = new User({ email, username });
                    const registeredUser = await User.register(newUser, password);
                    // console.log(registeredUser);

                    //this middleware used to by pass the process of loggin in after signup
                    //it automatically logins the user after signup
                    req.login(registeredUser, (err) => {
                              if (err) {
                                        next(err);
                              }
                              req.flash("success", "User Successfully Registered!!");
                              res.redirect("/listings");
                    });
                    
          }
          catch (e) {
                    req.flash("error", e.message);
                    res.redirect("/signup");
          }
};


module.exports.renderSignup = (req, res) => {
          res.render("users/signup.ejs");
};







module.exports.login = async (req, res) => {
          req.flash("success", "Welcome back to WanderLust");
          let redirectUrl = res.locals.redirectUrl || "/listings";
          res.redirect(redirectUrl);
};


module.exports.renderLogin = (req, res) => {
          res.render("users/login.ejs");
};


module.exports.logout =  (req, res, next) => {
          req.logout((err) => {
                    if (err) {
                              next(err);
                    }
                    req.flash("success", "You Successfully Logged out");
                    res.redirect("/listings");
          });   
}