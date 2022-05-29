import mongoose from "mongoose";

export default async() =>{
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
};

// mongodb+srv://aditi_misra:aditi12345@cluster0.y1f0x.mongodb.net/bookmyshow?retryWrites=true&w=majority

// mongodb+srv://AdityaGusain:AdityaGusain@zomato-master.3flxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority