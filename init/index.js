require('dotenv').config();

const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const sampleListings = require('./data.js');  // 👈 IMPORTANT

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await Listing.deleteMany({});

    console.log("Type of sampleListings:", typeof sampleListings);
    console.log("Is Array:", Array.isArray(sampleListings));

    const listingsWithOwner = sampleListings.map((obj) => ({
      ...obj,
      owner: '699496daf78b8ccc76814b36'
    }));

    await Listing.insertMany(listingsWithOwner);

    console.log("Database Seeded Successfully ✅");

    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error', err);
  }
}

seedDB();
