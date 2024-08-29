const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
//const cookieParser = require('cookie-parser');
const { isLoggedin, isOwner, validateListing } = require('../middleware.js');
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


router.post("/search", listingController.searchListing);


router.route("/")
          .get(wrapAsync(listingController.index))
          .post(
                    isLoggedin,
                    upload.single("listing[image]"), 
                    validateListing,
                    wrapAsync(listingController.createNewListing),
);
          
router.get("/new", isLoggedin , listingController.renderNewForm);

router.route("/:id")
          .get(
                    wrapAsync(listingController.showListing))
          .put(
                    isLoggedin,
                    isOwner,
                    upload.single("listing[image]"),
                    validateListing,
                    wrapAsync(listingController.editListing))
          .delete(
                    isLoggedin,
                    isOwner,
                    wrapAsync(listingController.destroyListing));


router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;



//get request to /listings where all listings are ther
//get request to /listings/new to create a new listing
//if we put /listing/:id first it will check for id and not for new
//get request to /listings/:id to show a particular listing
//get request to /listings/:id/edit to edit listing
//post request to /listings to finalise the new listing
//wrapAsync to handle async errors.

//delete request to /listings/:id to delete the whole listing


// put request to /listing/:id to update the details


