//libraries used in the project
import express from "express";


//database model
import { FoodModel } from "../../database/allModel";

//Valadating
import {ValidateId, validateCategory} from "../../Validation/common"

//creating route
const Router= express.Router();

/**
 * Router       /:_id
 * Des          Get  food based on id 
 * Params       _id
 * Method       GET
 */
Router.get("/:_id", async (req,res)=>{
    try{
        const {_id} = req.params;
        const foods = await FoodModel.findById(_id);
        return res.json({foods});
    }catch(error){
        res.status(500).json({error: error.message});
        }
})


/**
 * Router       /r/:_id
 * Des          Get all food based on the particular restraunt 
 * Params       none
 * Method       GET
 */

Router.get("/r/:_id", async (req,res)=>{
    try{
        await ValidateId(req.params);
        const {_id} = req.params;
        const foods = await FoodModel.find({restraunt: _id});
        if(!foods) return res.status(404).json({error: `No restraunt matched with ${category}`});
        return res.json({foods});
    }catch(error){
    res.status(500).json({error: error.message});
    }
});


export default Router;