const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongo = require("./mongo.js");
//

const GOOGLE_CLIENT_ID =
  "495428299858-ms0cr2cmi312f41bck8cmgvcrgtsm2nv.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://iiitdmkgetpass.online/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        roll: profile.email.substring(0, 9),
        name: profile.displayName,
        image: profile.picture,
        profile: "Student",
        phone: "0000000000",
        room: "000",
        hostel: "XXXX",
      };
      try {
        let user = await mongo.Staff.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          let user = await mongo.User.findOne({ googleId: profile.id });
          if (user) {
            mongo.User.updateOne(
              { googleId: user.googleId },
              { image: profile.picture },
              function (err) {
                if (err) {
                  console.log(err);
                }
              }
            );
            done(null, user);
          } else {
            user = await mongo.User.create(newUser);
            done(null, user);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
