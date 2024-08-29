if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const Listing = require('./models/listing.js');
// const mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';

const db_url = process.env.ATLASDB_URL
main().then(() => {
  console.log("Connection successful");
}).catch((err) => {
  console.log(err);
});
async function main() {
  await mongoose.connect(db_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsmate);

// app.get("/", (req, res) => {
//   res.send("Hello , This is the Root!");
//   //console.dir(req.cookies);
// });

const store = MongoStore.create({
  mongoUrl: db_url,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});


store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
})



const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};





app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
//so every time request knows which session it is part of
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  // console.log(res.locals.currUser);
  //console.log(res.locals.success);
  next();
});



// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "shreyash768@gmail.com",
//     username: "delta-student",
//   });
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });



//middleware to fetch all the routes of listings and reviews
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
//here :id remains in app.js but doesnt go to review.js so it becomes undefined
//mergedParams:true fixes this problems 



//url above the then catch block


// app.use(cookieParser("Some Random String"));

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie('Made-In', 'India', { signed: true });
//   res.send("Signed Cookie Sent");
// });


// app.get("/verify", (req, res) => {
//           console.log(req.cookies);
//           console.log(req.signedCookies);
//           res.send("Verify");
// })

//root server

//if user send req to random api end point , to handle that error
app.all("*", (req, res, next) => {
  next(new ExpressError(500, "Page not Found ! "));
});

//handling server side errors ,error middleware
app.use((err, req, res, next) => {
  let { statusCode = 501, message = "Some Error Occured" } = err;
  // console.log(statusCode);
  // console.log(err);
  res.status(statusCode).render("./listings/error.ejs", { err });
});


//building a server
app.listen(3000, () => {
  console.log("App listening on port 3000");
});


