const express=require('express');
const router=express.Router();
const User=require('../models/user.js');
const wrapAsync=require('../utils/wrapAsync.js');
const passport=require('passport');
const ExpressError=require('../utils/ExpressError.js');
const { savedRedirectUrl } = require('../middleware.js');
const { isloggedIn } = require('../middleware.js');

const userController=require('../controllers/user.js');
const review = require('../models/review.js');


// signup
router.route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signup));

//  LOGIN 
router.route("/login")
  .get(userController.renderlogin)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login
  );

 router.get("/profile", isloggedIn, async (req, res) => {

  const user = await User.findById(req.user._id)
    .populate("wishlist");   

  res.render("users/profile", { user });

});
  //  GOOGLE LOGIN 

// Step 1: Redirect to Google
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google Callback
router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    req.flash("success", "Welcome back to ApnaStay!");
    return res.redirect("/listings");
  }
);

// wishlist

router.post("/wishlist/:id", isloggedIn, async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);

  const exists = user.wishlist.includes(id);

  if (exists) {
    // remove
    user.wishlist.pull(id);
  } else {
    // add
    user.wishlist.push(id);
  }

  await user.save();

  res.redirect("/listings");
});


// Show profile
// router.get("/profile", isloggedIn, (req, res) => {
//     res.render("users/profile");
// });

// Show edit page
router.get("/profile/edit", isloggedIn, (req, res) => {
    res.render("users/edit");
});

// Update profile
router.put("/profile", isloggedIn, async (req, res) => {
    const { username, email, whatsapp } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        req.flash("error", "Username already taken!");
        return res.redirect("/profile/edit");
    }

    await User.findByIdAndUpdate(req.user._id, {
        username,
        email,
        whatsapp
    });

    req.flash("success", "Profile updated successfully!");
    res.redirect("/profile");
});

// Show Set Password Form
router.get("/set-password", isloggedIn, (req, res) => {
  res.render("users/setPassword");
});

// Handle Set Password
router.post("/set-password", isloggedIn, async (req, res) => {
  const { newPassword } = req.body;

  const user = await User.findById(req.user._id);

  // Set password using passport-local-mongoose
  await user.setPassword(newPassword);
  await user.save();

  req.flash("success", "Password set successfully! You can now login normally.");
  res.redirect("/profile");
});
//logout
router.get("/logout",userController.logout);


module.exports=router;


