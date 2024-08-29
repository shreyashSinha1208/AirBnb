const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require('joi');


//creating Schema(columns) for the particular flat/apartment/villa
const listingSchema = new Schema({
          title: {
                    type: String,
                    required: true
          },
          description: String,
          image: {
                    //since img has two key value pairs
                    url: String,
                    filename: String,
                    //when img property is not only set it is undefined
                    //hence we used default
                    // default: "https://images.unsplash.com/photo-1625438961829-5a1c8f1dc742?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    //set is used to set image based on condition
                    //when user passes the link it is passed as an argument
                    // set: (v) => v === "" ? "https://images.unsplash.com/photo-1625438961829-5a1c8f1dc742?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
                    //set is used when img argument is set to "" 
          },
          price: Number,
          location: String,
          country: String,
          reviews: [{
                    type: Schema.Types.ObjectId,
                    ref: "Review",
          }],
          owner: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
          },
          // geometry: {
          //           type: {
          //                     type: String, // Don't do `{ location: { type: String } }`
          //                     enum: ['Point'], // 'location.type' must be 'Point'
          //                     required: true,
          //           },
          //           coordinates: {
          //                     type: [Number],
          //                     required: true,
          //           }
          // }
});


//deleting all the reviews after the listing deleted
//mongoose middlewares
listingSchema.post("findOneAndDelete", async (listing) => {
          if (listing) {
                    await Review.deleteMany({ _id: { $in: listing.reviews } });
          }
});

//creating model for the schema
const Listing = mongoose.model("Listing", listingSchema);

//exporting the listing 
module.exports = Listing;