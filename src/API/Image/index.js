//library
import express from 'express';

//Database model
import { ImageModel } from '../../database/allModel';

//creating router
const Router = express.Router();

/**
 * Router        /:_id
 * des           fing images through id
 * params        _id
 * METHOD        get
*/
Router.get('/:_id', async(req, res)=>{
  try{
      const {_id} = req.params;
      const image = await ImageModel.findById(_id);
      return res.status(200).json(image);
       
    }catch(error){
      res.status(500).json({error: error.message});
   }
})


export default Router;