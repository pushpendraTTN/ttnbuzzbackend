var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const clientId = require('../config/gauthConfig').clientId;
const clientSecret = require('../config/gauthConfig').clientSecret;
const passport = require('passport');

// const jwt = require('jsonwebtoken');
// const jwt_Secret = 'a1b2c3d5g7h4';


module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:8000/auth/google/callback"
    }, (request,accessToken, refreshToken,profile, done) => { 
        User.findOne({ email: profile.emails[0].value }).then(async (data) => {
            if (data) {
                // console.log('data from google==>',data);
                return done(null, data);
            } else {
               await  User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    pic: profile.photos[0].value
                }).save(function (err,data) {
                    // console.log('save user',data);
                    // console.log(err);
                    return done(null,data);
                });
            }
            
        } );
        // return done(null, user);
    }
    ));


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
        // user.findOne({ email: profile.emails[0].value }).then((err,data) => {
        //     console.log('data===>',data);
        //     if(err){ return done(err); }
        //     if (data) {  return done(null, data);  } 
        //     else {
        //          user({
        //             name: profile.displayName,
        //             email: profile.emails[0].value,
        //             pic: profile.photos[0].value
        //                }).save(function (err, data) {
        //         });
        //     return done(null, user);
        // }          
