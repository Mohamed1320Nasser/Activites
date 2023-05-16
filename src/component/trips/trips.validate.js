const joi = require("joi");
exports.TripsValidation = joi.object({
  title_ar: joi.string().required().min(3).max(10).message('Title (Arabic) is required and must be at least 2 characters long'),
  title_en: joi.string().required().min(3).max(10).message('Title (English) is required and must be at least 2 characters long'),
  description_ar: joi.string().required().min(15).max(100000).message('Description (Arabic) is required and must be at least 15 characters long'),
  description_en: joi.string().required().min(15).max(100000).message('Description (English) is required and must be at least 15 characters long'),
  place_ar: joi.string().required().min(3).max(20).message('Place (Arabic) is required and must be at least 2 characters long'),
  place_en: joi.string().required().min(3).max(20).message('Place (English) is required and must be at least 2 characters long'),
  price: joi.number().required().min(0).max(10000).message('Price is required'),
  date: joi.date().required(),
  category: joi.string().hex().length(24).messages({
   "any.required": " Category Id Field Is Required",
   "any.empty": "Empty Category Id Is Not Acceptable",
 }),
});