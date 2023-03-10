const joi = require("joi");
const studenSchema = joi.object({
  name_ar: joi.string().required().min(3).max(10),
  name_en: joi.string().required().min(3).max(10),
  email: joi.string().email().required(),
  password: joi.string().required().regex(RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")),
  repassword: joi.ref("password"),
  phone: joi.number().required(),
  code: joi.number().required(),
  Specialization_ar:joi.string().required(),
  Specialization_er:joi.string().required(),
});
module.exports.studentValidation = (req, res, next) => {
     const  errorsArray = [];
     const { error } = studenSchema.validate(req.body,{abortEarly: false});
     if(!error){
        next();
     }else{
        error.details.map((msg)=>{
            errorsArray.push(msg.message);
        })
        res.json(errorsArray)
     }

}