const DiscordStrategy = require('passport-discord').Strategy;
const passport = require("passport");
require("dotenv").config();

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/verified',
    scope: ['identify', 'email']
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    var profile = profile.id
    done(null, accessToken)
}));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {
     done(null, id);
  });