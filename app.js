if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}
const MongoStore = require("connect-mongo").default;
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError.js');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy;   
const User=require('./models/user.js');
const wishlistRoutes = require("./routes/wishlist");

const listingRouter=require('./routes/listing.js');
const reviewRouter=require('./routes/review.js');
const userRouter=require('./routes/user.js');
const mongo_url=process.env.MONGO_URL;

main()
.then(()=>{
    console.log('Database connection successful(Atlas)');
})
.catch(err=>{
    console.error('Database connection error:', err);
});

async function main(){
    await mongoose.connect(mongo_url);
    console.log('Connected to MongoDB Atlas');
}
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.json());
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {

    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));


app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
});


//listings
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/wishlist", wishlistRoutes);
app.use("/",userRouter);


app.use((req, res, next) => {
    next(new ExpressError(404, 'Page not found'));
});

//error handling
app.use((err,req,res,next)=>{
    let{statusCode=500,message='Something went wrong'}=err;
res.status(statusCode).render('error.ejs',{err});
});
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    req.flash("error", "File too large! Max 2MB allowed.");
    return res.redirect("back");
  }
  next(err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});