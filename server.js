const express = require('express');
const mongoose = require('./config/dbConnection');
// const authroute = require('./routes/auth');
// const profileroute = require('./routes/profile');



const passport = require('passport');
require('./auth/googleauth')(passport);
// const session = require('express-session');
// const user = require('./models/user');


// const jwt = require('jsonwebtoken');
// const jwt_Secret = 'a1b2c3d5g7h4';



const app = express();
const port = process.env.port || 8000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());

// app.use(authroute);
// app.use(profileroute);

// app.use(session({
//     secret: "abcdef",
//     resave: false,
//     saveUninitialized: false
// }))
app.use(passport.initialize());
app.use(passport.session());

app.get('/google',(req,res,next)=>{
    console.log("reached google");
    next();
}, passport.authenticate('google', { session:false, scope: ['profile', 'email',] }));

app.get('/auth/google/callback',passport.authenticate('google',
{
    session: false
    // successRedirect: 'http://localhost:3000',
    // failureRedirect: "www.youtube.com"
},(req,res,next)=>{
    console.log(req);
}
));


// function isLoggedIn(req,res,next){
//     console.log(req.isAuthenticated())
//     req.isAuthenticated() ? next() : res.sendStatus(401)
// }


app.listen(port, ()=>{
    console.log(`server is up and running at port ${port}`);
});
