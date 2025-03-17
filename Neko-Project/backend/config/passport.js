const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");  // User model for saving authenticated users

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,  // From your Google Developer Console
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // From your Google Developer Console
            callbackURL: "http://localhost:5000/api/auth/google/callback",  // Adjust for your production URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // Create new user if not found
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    });

                    await user.save();
                }

                done(null, user);  // Proceed to next middleware
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);  // Store user ID in session
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);  // Fetch user details from DB based on stored ID
    });
});
