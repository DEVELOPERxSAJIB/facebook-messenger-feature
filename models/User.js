import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      default : null,
      unique: true
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "undefined"],
      default: "undefined",
    },
    photo: {
      public_id : {
        type : String,
        default : null,
      },
      url : {
        type : String,
        default : null,
      }
    },
    accessToken : {
      type : String,
      default : null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
