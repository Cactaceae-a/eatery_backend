//libraries
import express from "express";


//database model
import { MenuModel, ImageModel } from "../../database/allModel";

//validation
import {ValidateId} from "../../Validation/common"

//creating router
const Router= express.Router();

/**
 * Router       /list/:_id
 * Des          Get all the list of menu based on restaurant id
 * Params       _id
 * Method       GET
 */

Router.get("/list/:_id", async (req, res)=>{
try{
    await ValidateId(req.params);
    const {_id} = req.params;
    const menu = await MenuModel.findById({_id});
    if(!menu){
        return res.status(404).json({error: "no menu present for this resturant"});
    }
    return res.json({menu});
}catch(error){
    res.status(500).json({error: error.message});
}
});

/**
 * Router       /image/:id
 * Des          Get all the list of menu images with restaurant id
 * Params       _id
 * Method       GET
 */
 Router.get("/image/:_id", async (req, res)=>{
    try{
        await ValidateId(req.params);
        const {_id} = req.params;
        const menuImages = await MenuModel.findById({_id});
        if(!menuImages){
            return res.status(404).json({error: "no menu present for this resturant"});
        }
        return res.json({menu});
    }catch(error){
        res.status(500).json({error: error.message});
    }
    });


export default Router;