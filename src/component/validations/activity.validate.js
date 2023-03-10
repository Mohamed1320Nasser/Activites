const joi = require("joi");
const activitySchema = joi.object({
  title_ar: joi.string().required().min(3).max(10),
  title_en: joi.string().required().min(3).max(10),
  description_ar: joi.string().required().min(30).max(100000),
  description_en: joi.string().required().min(30).max(100000),
});
exports.ActivityValidation = (req, res, next) => {
     const  errorsArray = [];
     const { error } = activitySchema.validate(req.body,{abortEarly: false});
     if(!error){
        next();
     }else{
        error.details.map((msg)=>{
            errorsArray.push(msg.message);
        })
        res.json(errorsArray)
     }
}