const Listing = require('../models/listing');
const mongoose = require('mongoose');
const axios = require('axios');
const User = require("../models/user");


//  INDEX 
module.exports.index = async (req, res) => {

    const { search, filter, category } = req.query;

    let query = {};

    // 🔎 Search logic
    if (search && filter) {
        const regex = new RegExp(search, "i");

        if (filter === "country") {
            query.country = regex;
        } 
        else if (filter === "location") {
            query.location = regex;
        }
    }

    // 🏷 Category logic
    if (category) {
        query.category = category;
    }

 const allListings = await Listing.find(query);

let wishlist = [];
if (req.user) {
    const user = await User.findById(req.user._id);
    wishlist = user.wishlist;
}

res.render("listings/index", { allListings, wishlist });
};
//NEW FORM 
module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
};


// SHOW 
module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: { path: 'author' }
        })
        .populate('owner');

    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect('/listings');
    }

    res.render('listings/show.ejs', { listing });
};


//  CREATE 
module.exports.createListing = async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.images = { url, filename };

    await newListing.save();

    req.flash("success", "New listing Created");
    res.redirect(`/listings/${newListing._id}`);
};


//  EDIT FORM 
module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect('/listings');
    }

    let originalImageUrl = listing.images.url;
    originalImageUrl = originalImageUrl.replace(
        "/upload",
        "/upload/w_400,h_200,c_fill"
    );

    res.render('listings/edit.ejs', { listing, originalImageUrl });
};


//  UPDATE 
module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { runValidators: true, new: true }
    );


    // 📷 If new image uploaded
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.images = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};


// DELETE 
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect('/listings');
};