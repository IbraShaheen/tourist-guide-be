const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please add a username"],
    },
    slug: { type: String, slug: "username" },

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
        "https://unloc.online/wp-content/uploads/2020/04/283-2833820_user-icon-orange-png.png",
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