// Library
import  express  from "express";
import passport from "passport";

//Databasemodels
import { userModel } from "../../database/allModel";

//Validation
import { ValidateSignin} from "../../Validation/auth"

//creating a router
//using express
const Router = express.Router();


/**
 * Router        /signup
 * des           register new user
 * params        none
 * METHOD        Post
*/
Router.post("/signup", async (req, res)=>{
    try{
      await userModel.findByEmailAndPhone(req.body.credentials);
      const newUser = await userModel.create(req.body.credentials);
      const token = newUser.generateJwtToken();
      return res.status(200).json({ token, status: "success" });
    }catch(error){
     return res.status(500).json({error: error.message});
    }
});

/**
 * Router        /signin
 * des           sign in with email and password
 * params        none
 * METHOD        Post
*/

Router.post("/signin", async (req, res)=>{
try{
    await ValidateSignin(req.body.credentials);
    const user = await userModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  }catch(error){
     return res.status(500).json({error: error.message});
    }
});

/**
 *  Router       /google
 * des           google signin
 * params        none
 * METHOD        get
*/

Router.get("/google", passport.authenticate("google", {
   scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
}));

/**
 * Router       /google/callback
 * Des          Google signin callback
 * Params       none
 * Method       GET
 */
 Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      return res.redirect(
        `https://gentle-melba-fa3082.netlify.app/google/${req.session.passport.user.token}`
      );
    }
  );



export default Router;

