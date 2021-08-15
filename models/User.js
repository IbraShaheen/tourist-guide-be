const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please add a username"],
    },

    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },

    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please add your email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password can't be less than 8 characters"],
    },
    image: {
      type: String,
      default:
        "https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png",
    },


    phone: {
      type: Number,
      trim: true,
      // unique: true,
      // required: true,
      maxlength: [20, "phoneNumber can't be more than 20 digit"],
    },

    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    type:{
      type:String,
      default:"",
    },

    createdAt: {
        type: Date,
        default: Date.now,
      },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("fullname").get(function(){
  return `${this.firstname} ${this.lastname}`
})

module.exports = mongoose.model("User", UserSchema);