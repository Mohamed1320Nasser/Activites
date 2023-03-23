const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { deleteFromCloudinary } = require("../../utils/cludinary");
const StudentModel = require("./student.model");
exports.getProfile = catchAsyncError(async (req, res, next) => {
  if (req.query.lang == "en") {
    const Student = await StudentModel.findById(req.Student._id).populate([
      { path: "activity", select: "title_en -_id" },
    ]);
    if (!Student) return next(new AppError("Student not found", 404));
    res.status(200).json({ Student });
  } else {
    const Student = await StudentModel.findById(req.Student._id).populate([
      { path: "activity", select: "title_ar  -_id" },
    ]);
    if (!Student) return next(new AppError("Student not found", 404));
    res.status(200).json({ Student });
  }
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const studenId = req.Student._id;
  if (req.file) {
    if (!req.Student.cloudinary_id === "default") {
      await deleteFromCloudinary(req.Student.cloudinary_id);
    }
    const result = await uploadToCloudinary(req.file, "Student");
    req.body.image = result.secure_url;
    req.body.cloudinary_id = result.public_id;
    await StudentModel.findByIdAndUpdate(studenId, req.body, { new: true });
    res.status(200).json({ message: "success update" });
  } else {
    await StudentModel.findByIdAndUpdate(studenId, req.body, { new: true });
    res.status(200).json({ message: "success update" });
  }
});
module.exports.ChangePass = catchAsyncError(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  let match = await bcrypt.compare(oldPassword, req.Student.password);
  if (match) {
    let hash = await bcrypt.hash(newPassword, Number(process.env.saltRounds));
    await StudentModel.findByIdAndUpdate(req.Student, { password: hash });
    res.status(200).json({ message: " change password is succes" });
  } else {
    return res.status(200).json({ message: "old password incorrect" });
  }
});
