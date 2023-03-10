const joi = require("joi");
const CategoySchema = joi.object({
  title_ar: joi.string().required().min(3).max(10),
  title_en: joi.string().required().min(3).max(10),
  description_ar: joi.string().required().min(30).max(10000),
  description_en: joi.string().required().min(30).max(10000),
  goles_en:joi.string().required().min(20).max(1000),
  goles_ar:joi.string().required().min(20).max(1000),
});
exports.CategoryValidation = (req, res, next) => {
     const  errorsArray = [];
     const { error } = CategoySchema.validate(req.body,{abortEarly: false});
     if(!error){
        next();
     }else{
        error.details.map((msg)=>{
            errorsArray.push(msg.message);
        })
        res.json(errorsArray)
     }

}