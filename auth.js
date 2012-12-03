var passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy
  , User = require('./user').User
  , config = require('./config')

passport.use(new GitHubStrategy({
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
      profile.id = profile.username
      User.findOrCreate(profile, function (err, user) {
        return done(err, user);
      });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});
