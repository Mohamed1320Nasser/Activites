const joi = require("joi");
exports.studentSchema =  { body: joi
   .object()
   .required()
   .keys({
      fullName: joi.string().required().min(3).max(50).messages({
         "any.required": "studentName field is required",
         "any.empty": "empty studentName is not acceptable",
       }),
       email: joi.string().email().required().messages({
         "any.required": "student email field is required",
         "any.empty": "empty student email is not acceptable",
       }),
       password: joi.string().required().regex(RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)).messages({
         "any.required": "student password field is required",
         "any.empty": "empty student password is not acceptable",
       }),
       repassword: joi.ref("password"),
       phone: joi.number().required().messages({
         "any.required": "student phone field is required",
         "any.empty": "empty student phone is not acceptable",
       }),
         code: joi.number()
           .required()
           .integer()
           .min(200000000)
           .max(209999999)
           .messages({
             'number.base': 'Code must be a number',
             'number.empty': 'Code is required',
             'number.integer': 'Code must be an integer',
             'number.min': 'Code must start with the number 20',
             'number.max': 'Code must be exactly 9 digits long',
           }),
           Specialization:joi.string().required(),
})
}
exports.loginSchema = { body: joi
   .object()
   .required()
   .keys({
     email: joi.string().email().required().messages({
       "any.required": "student email field is required",
       "any.empty": "empty student name is not acceptable",
     }),
     password: joi.string().required().regex(RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)).messages({
      "any.required": "student password field is required",
      "any.empty": "empty student password is not acceptable",
     }),
   })};
   exports.changePassSchema = { body: joi
     .object()
     .required()
     .keys({
       oldPassword: joi.string().required().messages({
         "any.required": " old Password field is required",
         "any.empty": "empty  old Password is not acceptable",
       }),
       newPassword: joi.string().required().regex(RegExp(RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/))).messages({
         "any.required": "user new Password field is required",
         "any.empty": "empty user new Password is not acceptable",
       }),
     })}; 

     exports.updateProfileSchema={  
      body:joi.object()
      .required()
      .keys({
         fullName: joi.string().required().min(3).max(50).messages({
            "any.required": "studentName field is required",
            "any.empty": "empty studentName is not acceptable",}),
            phone: joi.number().required().messages({
               "any.required": "student phone field is required",
               "any.empty": "empty student phone is not acceptable",
             }),
             image: joi.string(),
      })
     }

   exports.restPassValidation={
      body:joi.object()
      .required()
      .keys({
         email: joi.string().email().required().messages({
            "any.required": "user email field is required",
            "any.empty": "empty user name is not acceptable",
          }),
      })
   }
   exports.verifyPassValidation={
      body:joi.object()
      .required()
      .keys({
         email: joi.string().email().required().messages({
            "any.required": "user email field is required",
            "any.empty": "empty user name is not acceptable",
          }),

          code:joi.number().required(),
          password: joi.string().required().regex(RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)).messages({
            "any.required": "student password field is required",
            "any.empty": "empty student password is not acceptable",
          }),
      })
   }