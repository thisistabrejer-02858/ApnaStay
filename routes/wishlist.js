const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const User = require("../models/user");
const  {isloggedIn } = require("../middleware");

router.use((req, res, next) => {
  console.log("Wishlist router is active");
  next();
});
// Add to wishlist
router.post("/:id", isloggedIn, async (req, res) => {
  console.log("POST wishlist route hit");

  const { id } = req.params;
  const user = await User.findById(req.user._id);

  if (!user.wishlist.includes(id)) {
    user.wishlist.push(id);
    await user.save();
  }

  return res.json({ success: true, action: "added" });
});

// Remove from wishlist
router.delete("/:id", isloggedIn, async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { wishlist: id }
  });

  res.json({ success: true, action: "removed" });
});

// Show wishlist page
router.get("/", isloggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.render("listings/wishlist", { wishlist: user.wishlist });
});

module.exports = router;