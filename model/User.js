import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { TOKEN_KEY } from "../config/index.js";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const GalleryItemSchema = new Schema({
  publicId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    // required: [true, "Please Enter Your Name"],
  },
  profileImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dateOfBirth: {
    type: String,
  },
  gallery: {
    type: Array,
  },
  interests: {
    type: String,
  },
  gender: {
    type: String,
  },
  height: {
    type: String,
  },
  country: {
    type: String,
  },
  idealMatch: {
    type: String,
  },
  intro: {
    type: String,
  },
  hobbies: {
    type: [String],
  },
  whoIam: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  liked: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],
  isMatched: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  verified: {
    type: Boolean,
    default: false,
  },
});


userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, TOKEN_KEY, {
    expiresIn: "15d",
  });
};


export const User = mongoose.model("User", userSchema);
