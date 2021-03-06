
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    address: [{detail: {trype: String}, for: {type: String}}],
    phoneNumber: [{type: Number}]
},
{
    timestamps: true,
  }
);

userSchema.methods.generateJwtToken = function(){
return jwt.sign({user: this._id.toString()}, "ZomatoApp");
}

userSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  // check wether email, phoneNumber exists in out database or not
  const checkUserByEmail = await userModel.findOne({ email });
  const checkUserByPhone = await userModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already exists!");
  }

  return false;
};

userSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  //check wether email exists
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User does nor exist!!!");

// compare password
const doesPasswordMatch = await bcrypt.compare(password, user.password);

if (!doesPasswordMatch) throw new Error("invalid password!!!");

return user;
};


userSchema.pre("save", function (next) {
  const user = this;

  //password is modified
  if (!user.isModified("password")) return next();

  //generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //assign hashed password
      user.password = hash;
      return next();
    });
  });
});

export const userModel= mongoose.model("users", userSchema);

