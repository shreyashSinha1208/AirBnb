const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const fuzzy = require('fuzzy');
const options = { extract: (el) => el.location };

module.exports.index = (async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

module.exports.renderNewForm = (req, res) => {
  //s console.log(req.user);
  res.render("./listings/new.ejs");

};

module.exports.searchListing = (async (req, res) => {

  let searched_loc = req.body.search;
  if (searched_loc.length===0) {
    return res.redirect("/listings");
  }
  let allListings = await Listing.find().exec();
  let matchedListings = fuzzy.filter(searched_loc, allListings, options);
  matchedListings = matchedListings.map((result) => result.original);
  if (matchedListings.length===0) {
    req.flash("error", "Sorry, No listing with the given location found!");
    return res.redirect("/listings");
  }
   res.render('./listings/index', { allListings: matchedListings });

});


module.exports.showListing = (async (req, res) => {
  let { id } = req.params;
  console.log(id);
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    }).populate("owner");
  //console.log(listing);
  if (!listing) {
    req.flash("error", "Requested Listing not found!");
    res.redirect("/listings");
  }
  // console.log(listing);
  res.render("./listings/show.ejs", { listing });
});


module.exports.createNewListing = (async (req, res, next) => {
  //req.body returns an object so it can be passed directly to be saved
  // let { title, description, image, price, location, country } = req.body;
  //let result = listingSchema.validate(req.body);
  //console.log(result);
  // let response = await geocodingClient.forwardGeocode({
  //   query: req.body.listing.location,
  //   limit: 1,
  // })
  //   .send();
  // console.log(response.body.features[0].geometry);
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  // newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "Listing Saved Successfully!");
  console.log("saved");
  res.redirect("/listings");
});


module.exports.renderEditForm = (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Requested Listing not found!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("./listings/edit.ejs", { listing, originalImageUrl });
});


module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};


module.exports.editListing = (async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings`);
});