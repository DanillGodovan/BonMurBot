const DiscordStrategy = require('passport-discord').Strategy;
const passport = require("passport");
const mongoose = require('mongoose')
const User = require('../data/user')
require("dotenv").config();

    passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/verified',
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    let profileID = profile.id.toString()
    let data = await User.findOne({userID: profileID})
    console.log(data)
    data.verified = true
    data.save()
    done(null, accessToken)
}));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {
     done(null, id);
  });