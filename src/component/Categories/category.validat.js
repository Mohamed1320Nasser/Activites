const joi = require("joi");
exports.CategoySchema = joi.object({
   title_ar: joi.string().required().min(2).max(10).message('Title (Arabic) is required and must be at least 2 characters long'),
   title_en: joi.string().required().min(2).max(10).message('Title (English) is required and must be at least 2 characters long'),
   description_ar: joi.string().required().min(20).max(100000).message('Description (Arabic) is required and must be at least 20 characters long'),
   description_en: joi.string().required().min(20).max(100000).message('Description (English) is required and must be at least 20 characters long'),
   coverImage: joi.string(),
   images: joi.array().items(joi.string()),
  goles_en:joi.string().required().min(10).max(1000).message('Goles (Arabic) is required and must be at least 10 characters long'),
  goles_ar:joi.string().required().min(10).max(1000).message('Goles (Arabic) is required and must be at least 10 characters long'),
});
