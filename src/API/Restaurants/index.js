//libraries
import express from "express";


//database model
import { RestaurantModel } from "../../database/allModel";

//validation
import {ValidateId} from "../../Validation/common"
import { ValidateRestaurantSearchString} from "../../Validation/restaurant"

//creating router
const Router= express.Router();

/**
 * Router       /
 * Des          Get all restraunats detail based on the city
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get('/', async (req,res)=>{
    try{
        const {city} = req.query;
        const restraunats = await RestaurantModel.find({city});
        if(restraunats.length==0){
            res.json({error: "No restaurant found in this city"});
        }
        return res.json({restraunats});
    }catch(error){
    res.status(500).json({error: error.message});
    }
});

 /**
 * Router       /:_id
 * Des          Get single restaurant details based on id
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get('/:_id', async (req,res)=>{
    try{
        await ValidateId(req.params);
        const {_id} = req.params;
        const restraunat = await RestaurantModel.findById({_id});
        if(!restraunat){
           return res.status(400).json({error: "Restaurant not found"});
        }
        return res.json({restraunat});
        }catch(error){
        res.status(500).json({error: error.message});
        }
});

 /**
 * Router       /search
 * Des          Get restaurant id based on search string
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get('/search/:searchString', async (req,res)=>{
    try{
        await ValidateRestaurantSearchString(req.params);
        const {searchString}= req.params;
        console.log(searchString)
        const restaurants= await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"},
        });
        if(!restaurants) return res.status(404).json({error: `No restraunt matched with ${searchString}`});
        return res.json(restaurants[0]._id);
        }catch(error){
        res.status(500).json({error: error.message});
        }
})

export default Router;