const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const YouthWelfareModel = require("./YouthWelfare.model");
// to creat a description and name of the youth Activity
module.exports.creatYouthWelfare = catchAsyncError(async (req, res) => {
  console.log(req.file);
  const YouthWelfare = new YouthWelfareModel(req.body);
  await YouthWelfare.save();
  res.status(200).json(YouthWelfare);
});
// to get the YouthWelfare {description and name} of youth Activity
exports.getYouthWelfare = catchAsyncError(async (req, res, next) => {
  console.log(req.query);
  if (req.query.lang == "en") {
    const YouthWelfare = await YouthWelfareModel.find({}).select(
      "name_en description_en"
    );
    !YouthWelfare && next(new AppError("YouthWelfare not found", 404));
    YouthWelfare && res.status(200).json({ result: YouthWelfare });
  } else {
    const YouthWelfare = await YouthWelfareModel.find({}).select(
      "name_ar description_ar"
    );
    !YouthWelfare && next(new AppError("وصف رعايه الشباب غير موجود ", 404));
    YouthWelfare && res.status(200).json({ result: YouthWelfare });
  }
});
// update the YouthWelfare {description and name} of youth Activity
exports.updateYouthWelfare = catchAsyncError(async (req, res) => {
  const YouthWelfare = await YouthWelfareModel.findOneAndUpdate(req.body, {
    new: true,
  });
  !YouthWelfare && next(new AppError("YouthWelfare not found", 404));
  YouthWelfare && res.status(200).json({ result: YouthWelfare });
});
// delete the YouthWelfare {description and name} of youth Activity
exports.deleteYouthWelfare = catchAsyncError(async (req, res) => {
  const YouthWelfare = await YouthWelfareModel.findByOneAndDelete(req.body, {
    new: true,
  });
  !YouthWelfare && next(new AppError("YouthWelfare not found", 404));
  YouthWelfare && res.status(200).json("deletet");
});
