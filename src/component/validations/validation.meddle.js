exports.validation=(schema)=>{
    return (req,res,next)=>{
        const validationResult=schema.body.validate(req.body);
        // console.log(validationResult);
        console.log(req.body);
    }
}