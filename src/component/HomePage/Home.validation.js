
const joi = require("joi")
exports.homeValidation = {
  body: joi
    .object()
    .required()
    .keys({
      description_ar: joi.string().required().min(20).max(100000).message('Description (Arabic) is required and must be at least 20 characters long'),
      description_en: joi.string().required().min(30).max(100000).message('Description (English) is required and must be at least 20 characters long'),
      coverImage: joi.string(),
      images: joi.array().items(joi.string()),
    }),
};
