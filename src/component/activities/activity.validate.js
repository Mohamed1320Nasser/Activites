const joi = require("joi")
exports.ActivityValidation = {
  body: joi
    .object()
    .required()
    .keys({
      title_ar: joi.string().required().min(2).max(50).message('Title (Arabic) is required and must be at least 2 characters long'),
      title_en: joi.string().required().min(2).max(50).message('Title (English) is required and must be at least 2 characters long'),
      description_ar: joi.string().required().min(20).max(100000).message('Description (Arabic) is required and must be at least 20 characters long'),
      description_en: joi.string().required().min(20).max(100000).message('Description (English) is required and must be at least 20 characters long'),
      coverImage: joi.string(),
      images: joi.array().items(joi.string()),
      category: joi.string().hex().length(24).messages({
        "any.required": " Category Id Field Is Required",
        "any.empty": "Empty Category Id Is Not Acceptable",
      }),
    }),
};
