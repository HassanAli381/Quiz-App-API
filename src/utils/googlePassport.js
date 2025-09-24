const passport = require('passport');
const Strategy  = require('passport-google-oauth20');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');

const AppError = require('./AppError');
const { FAIL } = require('./responseStatus');
const User = require('./../models/user.model');
dotenv.config();


passport.use(
    new Strategy (
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5050/api/auth/google/redirect'
        },
        // runs after google authenticates the user
        async(accessToken, refreshToken, profile, cb) => {

            const email = profile.emails?.[0].value;
            if(!email)
                return cb(new AppError(FAIL, 400, 'No email found'))

            let user = await User.findOne({
                email
            });

            // signup new user
            if(!user) {
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails?.[0].value,
                    password: '1',
                    authenticatedByGoogle: true
                });
                
                await newUser.save();
                return cb(null, newUser);
            }
            
            user.lastLogin = new Date();
            await user.save();
        
            return cb(null, user);
        }
    )
);

module.exports = passport;