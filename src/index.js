// MAIN BACKEND FILE
require('dotenv').config();
import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//Database connection
import ConnectDB from "./database/connection";

//google authentication config
import googleAuthConfig from "./config/google.config";

//private route authentication config
import privateRouteConfig from "./config/route.config"

//API
import Auth from './API/Auth'
import Restaurant from './API/Restaurants'
import Food from './API/Food'
import Menu from './API/Menu'
import Image from "./API/Image"
import Order from "./API/Orders"
import Reviews from "./API/Reviews"
import User from "./API/user"
import RegisteredUsres from "./API/registeredUsers"

//passport config
googleAuthConfig(passport);
privateRouteConfig(passport);

const eatery = express();
eatery.use(cors())
eatery.use(express.json());
eatery.use(helmet());
const { json } = require("express");
const { Route } = require('express');
eatery.use(passport.initialize());


//Application Routes
eatery.use("/auth", Auth);
eatery.use("/restaurant", Restaurant);
eatery.use("/food", Food);
eatery.use("/menu", Menu);
eatery.use("/image", Image);
eatery.use("/order", Order);
eatery.use("/review", Reviews);
eatery.use("/user", User);
eatery.use("/registeredusers", RegisteredUsres);

const PORT= process.env.PORT || 5000
eatery.listen(PORT, ()=>{
    ConnectDB().then(()=>{
    console.log("server is running");
    }).catch((error)=>{
    console.log("server is running but database connection failed");
    console.log(error);
    })
});





