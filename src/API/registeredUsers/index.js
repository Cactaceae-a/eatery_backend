//library
import express from 'express';
const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");
require('dotenv').config();
const { v4: uuidv4, v4 } = require("uuid");
uuidv4();

//Database model
import { RegisteredUsresModel } from '../../database/allModel';

//creating Router
const Router = express.Router();


//utility function
import {s3Upload} from '../../utils/s3'

var key = process.env.KEY;
var endpoint = process.env.ENDPOINT;

// <credentials>
const credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Ocp-Apim-Subscription-Key": key },
});
const client = new Face.FaceClient(credentials, endpoint);
// </credentials>


// <recognize>
async function DetectFaceRecognize(url) {
  // Detect faces from image URL. Since only recognizing, use the recognition model 4.
  // We use detection model 3 because we are only retrieving the qualityForRecognition attribute.
  let detected_faces = await client.face.detectWithUrl(url, {
    detectionModel: "detection_03",
    recognitionModel: "recognition_04",
    returnFaceAttributes: ["QualityForRecognition"],
  });

  return detected_faces.filter(
    (face) =>
      face.faceAttributes.qualityForRecognition == "high" ||
      face.faceAttributes.qualityForRecognition == "medium"
  );
}
// </recognize>

async function FindSimilar() {
  console.log("========FIND SIMILAR========");
  console.log();


  let target_face_ids = (
    await Promise.all(
      target_image_file_names.map(async function (target_image_file_name) {
        // Detect faces from target image url.
        var faces = await DetectFaceRecognize(
          target_image_file_name
        );
        console.log(
          faces.length +
            " face(s) detected from image: " +
            target_image_file_name +
            "."
        );
        return faces.map(function (face) {
          return face.faceId;
        });
      })
    )
  ).flat();

  // Detect faces from source image url.
  let detected_faces = await DetectFaceRecognize(
   source_image_file_name
  );
  // </snippet_loadfaces>

  // <find_similar>
  // Find a similar face(s) in the list of IDs. Comapring only the first in list for testing purposes.
  let results = await client.face.findSimilar(detected_faces[0].faceId, {
    faceIds: target_face_ids,
  });
  source_image_file_name = "";
  target_image_file_names = [];
  return results;
}
// </find_similar>


  // <snippet_loadfaces>
  var source_image_file_name = "";
  var target_image_file_names = [];

/**
 * Router       /image
 * Des          Uploads given image to S3 bucket
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post('/', async(req, res)=>{
    try{
        var buf = Buffer.from(req.body.file.file.replace(/^data:image\/\w+;base64,/, ""),'base64');
        // console.log(req.body)
        var data = {
          Bucket: "zomato-master-new",
          Key: Date.now() + '.jpeg', 
          Body: buf,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
          ACL: "public-read" //Access control List  
        };
      //saving to s3  
      const uploadImage= await s3Upload(data);

      source_image_file_name = uploadImage.Location;
      // console.log("source image"+ source_image_file_name);
      const orders =req.body.file.orders;
      // console.log(orders)
      // console.log(orders[0].restaurant)
      const image = await RegisteredUsresModel.find({restaurant: orders[0].restaurant});
      // console.log("registered peeps" + image)
         image.map((e)=>{
          //  console.log(e)
          target_image_file_names.push(e.images);
         })

        var checking_restaurant = orders[0].restaurant;
        var count=0;
        orders.map((e)=>{
          if(e.restaurant==checking_restaurant){
             count+=1;
           
          }})
         var check= false
          if(count==orders.length){
             check=true;
          }
        
         //calling Find Similar model for detection 
         var finalResults = await FindSimilar()
        //  console.log(finalResults.length, finalResults[0].confidence, check)
        // finalResults.map((e)=>console.log(e));
        //checking for similar face
         if(finalResults.length !=0 && finalResults[0].confidence > 0.79 && check){
          return res.status(200).json("success");
         }
         else{
          res.status(200).json("error")
         }
    }catch(error){
      res.status(500).json("error");
    }
})
/**
 * Router       /image
 * Des          Uploads given image to S3 bucket and save the file name to mongodb
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post('/upload', async(req, res)=>{
    try{
        var buf = Buffer.from(req.body.file.file.replace(/^data:image\/\w+;base64,/, ""),'base64');
        var data = {
          Bucket: "zomato-master-new",
          Key: Date.now() + '.jpeg', 
          Body: buf,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
          ACL: "public-read" //Access control List  
        };

      const uploadImage= await s3Upload(data);
     
      const saveImageToDatabase = await RegisteredUsresModel.create({
       restaurant: req.body.file.restaurantID,
        images: uploadImage.Location ,
      });
      return res.status(200).json(saveImageToDatabase);
    }catch(error){
        res.status(500).json("error");
    }
})

export default Router;