
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const UserModel = require("./user.model");
// to creat User
module.exports.creatUser = catchAsyncError(async (req, res, next) => {
  const findUser = await UserModel.findOne({ email: req.body.email });
  if (findUser) return next(new AppError("user already exists", 500));
  const User = new UserModel(req.body);
  await User.save();
  res.status(200).json(User);
});
// to get the All Users {description and name} of youth User
exports.getUsers = catchAsyncError(async (req, res, next) => {
  // getStudents("6403b482ac496178ab47fe88");
  if (req.query.lang == "en") {
    const User = await UserModel.find({})
      .populate([
        { path: "activity", select: "title_en -_id" },
        { path: "trip", select: "title_en -_id" },
      ])
      .select("-name_ar -Specialization_en ");
    !User && next(new AppError("User not found", 404));
    User && res.status(200).json({ result: User });
  } else {
    const User = await UserModel.find({})
      .select("-name_en -Specialization_en ")
      .populate([
        { path: "activity", select: "title_en -_id" },
        { path: "trip", select: "title_en -_id" },
      ])
    !User && next(new AppError("غير موجود", 404));
    User && res.status(200).json({ result: User });
  }
});
exports.getٍSpcificUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.query.lang == "en") {
    const User = await UserModel.findById(id)
      .select("-name_ar -Specialization_ar")
      .populate("activity");
    !User && next(new AppError("not found ", 404));
    User && res.status(200).json({ result: User });
  } else {
    const User = await UserModel.findById(id).select(
      "-name_en -Specialization_en"
    );
    !User && next(new AppError("غير موجود", 404));
    User && res.status(200).json({ result: User });
  }
});
// update the User {description and name} of youth User
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const User = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !User && next(new AppError("User not found", 404));
  User && res.status(200).json({ result: User });
});
// delete the User {description and name} of youth User
exports.deleteUser = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const User = await UserModel.findByIdAndDelete(id, {
    new: true,
  });
  !User && next(new AppError("User not found", 404));
  User && res.status(200).json("deleted");
});

module.exports.ChangePass = catchAsyncError(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const password = newPassword;
  let match = await bcrypt.compare(oldPassword, req.user.password);
  if (match) {
    let hash = await bcrypt.hash(password, Number(process.env.saltRounds));
    const user = await UserModel.updateOne(
      { _id: req.user._id },
      { password: hash }
    );
    res.status(200).json({ message: "succes", user });
  } else {
    next(new AppError("old password incorrect", 404));
  }
});
// 01144137171
