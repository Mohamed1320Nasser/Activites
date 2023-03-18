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
    coverImage: String,
    cloudinary_id: String,
    images: [],
    numRecorded: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        studenId: {
          type: Types.ObjectId,
          ref: "user",
        },
        rate: {
          type: Number,
          min: [1, "rate must be grater than or equal 1"],
          max: [5, "rate must be less than or equal  5"],
        },
      },
    ],
    averageRating: {
      type: Number,
      min: [1, "ratingAvarege must be grater than or equal 1"],
      max: [5, "ratingAvarege must be less than or equal  5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);
module.exports = model("activity", schema);
