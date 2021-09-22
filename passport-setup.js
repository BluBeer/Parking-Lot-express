const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const data = await global.db.collection('User').findOne({ id });
  done(null, data);
});

passport.use(new GoogleStrategy({
  clientID: '631926794217-5j32g3j4gaeqa1s3f8m01lvbmlkg4pna.apps.googleusercontent.com',
  clientSecret: '6lXXNhDyxP4E6UrhcYzHKW97',
  callbackURL: 'http://localhost:3000/google/callback',
},
(async (accessToken, refreshToken, profile, cb) => {
  const data = await global.db.collection('User').findOneAndUpdate(
    { id: profile.id },
    {
      $setOnInsert: { Name: profile.displayName },
    }, {
      returnOriginal: false,
      upsert: true,
    },
  );
  // console.log(data.value);
  return cb(null, data.value);
})));
