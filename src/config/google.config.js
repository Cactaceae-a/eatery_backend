import googleOAuth from 'passport-google-oauth20';
import { userModel } from '../../src/database/allModel';

const GoogleStrategy= googleOAuth.Strategy

export default (passport)=>{
   passport.use(
       new GoogleStrategy(
           {
               clientID: process.env.GOOGLE_CLIENT_ID,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET,
               callbackURL: "https://eatery-backend.herokuapp.com/auth/google/callback"
           },
           async (accessToken, refreshToken, profile, done)=>{
             // create a new user object
             const newUser = {
            fullName: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
           };

           try {
            // check if the user exist
            const user = await userModel.findOne({ email: newUser.email });
  
            if (user) {
              // generate token
              const token = user.generateJwtToken();
  
              // return user
              done(null, { user, token });
            } else {
              // create new user
              const user = await userModel.create(newUser);
  
              // generate token
              const token = user.generateJwtToken();
  
              // return user
              done(null, { user, token });
            }
          } catch (error) {
            done(error, null);
          }
        }
       )
   )
   passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};