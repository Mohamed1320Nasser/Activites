const bcrypt = require("bcrypt");
const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "student name requires"],
      minlength: 2,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dw0cormzj/image/upload/v1679430518/Youth%20Welfare/Student/profile_dteqac.jpg",
    },
    cloudinary_id: {
      type: String,
      default: "default",
    },
    code: {
      type: Number,
      required: [true, "user code requires"],
    },
    email: {
      type: String,
      required: [true, "user email requires"],
      trim: true,
      unique: [true, "user email unique"],
    },
    phone: {
      type: String,
      required: [true, "user phone requires"],
    },
    password: {
      type: String,
      required: [true, "user password requires"],
      minlength: [6, "less than chracter length must be 6"],
    },
    resetCode:String,
    passwordChangeAt: Date,
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    active:{
      type:Boolean,
      default: false
    },
    Isverified: {
      type: Boolean,
      default: false,
    },
    emailToken: String,
    Specialization_ar: {
      type: String,
      required: [true, "يجب ادخال اسم التخصص"],
    },
    Specialization_en: {
      type: String,
      required: [true, "student Specialization requires"],
    },

    activity: [
      {
        type: Types.ObjectId,
        ref: "activity",
      },
    ],
    trip: [
      {
        type: Types.ObjectId,
        ref: "trip",
      },
    ],

    passwordChangeAt: Date,
  },
  { timestamps: true }
);
schema.pre("save", function () {
  this.password = bcrypt.hashSync(
    this.password,
    Number(process.env.saltRounds)
  );
});
module.exports = model("student", schema);
