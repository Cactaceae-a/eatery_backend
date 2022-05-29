//libraries
import express from 'express';
import passport from 'passport';

//database model
import { ReviewModel } from '../../database/allModel';

//validation
import { ValidateId } from '../../Validation/common';

//creating router
const Router = express.Router();

/**
 * Router       /:resid
 * Des          Get all reviews for a particular restraunt
 * Params       resid
 * Access       Public
 * Method       GET
 */

 Router.get("/:resid",async (req,res)=>{
    try{
      const {resid}= req.params;
      const reviews = await ReviewModel.find({restaurant: resid});
      return res.status(200).json({reviews});
    }catch(error){
    return res.status(500).json({error: error.message});
    }
    });

 /**
 * Router       /new
 * Des          POST: for food/restaurant review & ratting
 * Params       NONE
 * Access       Private
 * Method       POST
 */
Router.post("/new", passport.authenticate('jwt'), async (req,res)=>{
  try{
      const { _id } = req.session.passport.user._doc;
      console.log(_id);
      const { reviewData }= req.body;
      await ReviewModel.create({...reviewData, user: _id});
      return res.json({reviews: "Sucessfully created review"});
  }catch(error){
      return res.status(500).json({error: error.message});
  }
  });
 /**
 * Router       /delete
 * Des          delete a specific revies
 * Params       _id
 * Access       Public
 * Method       DELETE
 */
Router.delete("/delete/:_id",async (req,res)=>{
  try{
      await ValidateId(req.params);
      const {_id}= req.params;
      await ReviewModel.findByIdAndDelete({_id});
      return res.json({reviews: "Sucessfully deleted review"});
  }catch(error){
      return res.status(500).json({error: error.message});
  }
  });

export default Router;