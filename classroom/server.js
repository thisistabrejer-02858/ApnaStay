const express = require("express");
const app = express();
// const users = require("./routes/user.js");
// const posts = require("./routes/post.js");
const session = require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


const sessionOptions = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
 res.locals.successmsg=req.flash("success");
  res.locals.errormsg=req.flash("error");
  next();
})
 
app.get("/register",(req,res)=>{
    let{name="Guest"}=req.query;
    req.session.name=name;
    if(name==="Guest"){
          req.flash("error","user not registered "); 
    }
    else{
         req.flash("success","user registered successfully"); 
    }
    //key: value pair used here
res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
   
    res.render("page.ejs",{name:req.session.name}); //accessed by key
});





app.listen(3000, () => {
    console.log("server is listening to 3000");
});
