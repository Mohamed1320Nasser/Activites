const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    title_ar: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
    },
    title_en: {
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
    goles_ar:{
      type: String,
      required: true,
      minlength: 10,
    },
    goles_en:{
      type: String,
      required: true,
      minlength: 10,
    },
    coverImage: String,
    cloudinary_id: String,
    images: [],
  },
  { timestamps: true }
);
module.exports = model("category", schema);
