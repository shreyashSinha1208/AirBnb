const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { validateReview, isLoggedin, isAuthor } = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');




//post request to add review /listings/:id/reviews
router.post("/", isLoggedin , validateReview, wrapAsync(reviewController.createReview));
 
//delete request to /listings/:id/reviews/:reviewId
router.delete("/:reviewId", isLoggedin , isAuthor , wrapAsync(reviewController.destroyReview));

module.exports = router;