const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedin = (req, res, next) => {
          if (!req.isAuthenticated()) {
                    //save redirected URL
                    req.session.redirectUrl = req.originalUrl;
                    req.flash("error", "You must be Logged in to add changes in Listings!!");
                    res.redirect("/login");
          }
          next();
}

//saving the url of the path user wanted to access before login
module.exports.saveRedirectUrl = (req, res, next) => {
          if (req.session.redirectUrl) {
                    res.locals.redirectUrl = req.session.redirectUrl;
          }
          next();
};



module.exports.isOwner = async (req, res, next) => {
          let { id } = req.params;
          let listing = await Listing.findById(id);
          if (res.locals.currUser && !res.locals.currUser._id.equals(listing.owner._id)) {
                    req.flash("error", "You dont have permission to edit!!");
                    return res.redirect(`/listings/${id}`);
          }
          next();
};


module.exports.validateListing = (req, res, next) => {
          let { error } = listingSchema.validate(req.body);
          console.log(req.body);
          if (error) {
         // console.log(error);
          throw new ExpressError(400, error);
          }
          else {
          next();
          }
};


module.exports.validateReview = (req, res, next) => {
          let { error } = reviewSchema.validate(req.body);
          console.log(req.body);
          if (error) {
         // console.log(error);
          throw new ExpressError(400, error);
          }
          else {
          next();
          }
};


module.exports.isAuthor = async (req, res, next) => {
          let { id, reviewId } = req.params;
          let review = await Review.findById(reviewId);
          if (res.locals.currUser && !review.author._id.equals(res.locals.currUser._id)) {
                    req.flash("error", "You are not the author of this review!!");
                    return res.redirect(`/listings/${id}`);
          }
          next();
};
