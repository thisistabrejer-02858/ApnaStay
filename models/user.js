
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongooseModule = require("passport-local-mongoose");

// 👇 IMPORTANT LINE
const passportLocalMongoose = passportLocalMongooseModule.default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  whatsapp: {              
    type: String
  },
  wishlist: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing"
  }
],
   googleId: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
