//libraries
import express from 'express';
import passport from 'passport';

//database model
import { OrderModel } from '../../database/allModel';

//validation
import { ValidateId } from '../../Validation/common';

//validatr usr
import validateuser from '../../config/validateuser';

const Router = express.Router();
/**
 * Router       /
 * Des          Get all orders based on _id
 * Params       _id
 * Access       private
 * Method       GET
 */

Router.get("/:_id", passport.authenticate("jwt"),async (req,res)=>{
try{
    await validateuser(req, res);
    await ValidateId(req.params);
    const {_id}= req.params;
    const getOrders = await OrderModel.findOne({user: _id});
    if(!getOrders){
        return res.status(400).json({error: "user not found"});
    }
    return res.status(200).json({orders: getOrders});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

/**
 * Router       /new
 * Des          add new order
 * Params       _id
 * Access       Private
 * Method       POST
 */
 Router.post("/new/:_id",  passport.authenticate("jwt"), async (req,res)=>{
    try{
      const {_id}= req.params;
      const {orderDetails}= req.body;
      const addNewOrders = await OrderModel.findOneAndUpdate({
          user: _id}, {
              $push: {orderDetails}
          }, 
          {new: true} //to make this function return updated value
          );
      
      return res.status(200).json({order: addNewOrders});
    }catch(error){
    return res.status(500).json({error: error.message});
    }
    });

export default Router;

