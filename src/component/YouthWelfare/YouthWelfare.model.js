const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name_ar: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
    },
    name_en: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
    },

    description_ar: {
      type: String,
      required: true,
      minlength: 20,
    },
    description_en: {
      type: String,
      required: true,
      minlength: 20,
    },
  },
  { timestamps: true }
);
module.exports = model("youthWelfare", schema);
