import mongoose from "mongoose";
const RegisteredUsresSchema = new mongoose.Schema(
    {
      restaurant: { type: mongoose.Types.ObjectId, ref: "restaurants" },
      images: { type: String, required: true }
      
    },
    {
      timestamps: true,
    }
  );
export const RegisteredUsresModel= mongoose.model("registeredUsers", RegisteredUsresSchema);