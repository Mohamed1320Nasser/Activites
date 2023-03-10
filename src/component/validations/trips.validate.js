const joi = require("joi");
const TripsSchema = joi.object({
  title_ar: joi.string().required().min(3).max(10),
  title_en: joi.string().required().min(3).max(10),
  description_ar: joi.string().required().min(30).max(100000),
  description_en: joi.string().required().min(30).max(100000),
  place_ar: joi.string().required().min(3).max(20),
  place_en: joi.string().required().min(30).max(20),
  price: joi.number().required().min(0).max(10000),
});
exports.TripsValidation = (req, res, next) => {
     const  errorsArray = [];
     const { error } = TripsSchema.validate(req.body,{abortEarly: false});
     if(!error){
        next();
     }else{
        error.details.map((msg)=>{
            errorsArray.push(msg.message);
        })
        res.json(errorsArray)
     }
}