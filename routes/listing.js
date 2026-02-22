const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const Listing=require('../models/listing.js');
const {isloggedIn,isOwner,validateListing}=require('../middleware.js');
const ExpressError=require('../utils/ExpressError.js');
const { createListing, updateListing } = require('../controllers/listing.js');
const listingController=require('../controllers/listing.js');
const multer=require('multer');
const { upload } = require('../cloudConfig.js');


//INDEX +create
router.route("/")
  .get(wrapAsync(listingController.index)) // index route
  .post(
    isloggedIn,
    upload.single('listing[images]'),
    validateListing,  //multer process data here
    wrapAsync(listingController.createListing)
  );
//new
router.get(
  "/new",
  isloggedIn,
  listingController.renderNewForm
);

// ================= SHOW + UPDATE + DELETE =================
router.route("/:id")
  .get(wrapAsync(listingController.showListing)) // show
  .put(
    isloggedIn,
    isOwner,
     upload.single('listing[images]'),
    validateListing,
    wrapAsync(listingController.updateListing)
  ) // update
  .delete(
    isloggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  ); // delete

// ================= EDIT =================
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
module.exports=router;