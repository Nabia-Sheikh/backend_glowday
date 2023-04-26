// External Import
import mongoose from "mongoose"

// Init Schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.isGoogle && !this.isFacebook
    },
  },
  mobileNumber: {
    type: String,
  },
  active: {
    type: Boolean,

    default: false,
  },
  verified: {
    type: Boolean,

    default: false,
  },
  randString: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  isFacebook: {
    type: Boolean,
    default: false,
  },
})

// Model Init
const userModel = new mongoose.model("user", userSchema)
userModel.createIndexes()

export default userModel
