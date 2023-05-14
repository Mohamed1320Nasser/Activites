
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
    image: String,
    category: {
      type: Types.ObjectId,
      ref: "category",
    },
    price: Number,
    place_ar: { type: String, required: true },
    place_en: { type: String, required: true },
    date: Date,
    numRecorded: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = model("trip", schema);
