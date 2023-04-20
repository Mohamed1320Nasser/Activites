
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const StudentModel = require("./student.model");
// to creat Student
module.exports.creatStudent = catchAsyncError(async (req, res, next) => {
  const findStudent = await StudentModel.findOne({ email: req.body.email });
  if (findStudent) return next(new AppError("Student already exists", 500));
  const Student = new StudentModel(req.body);
  await Student.save();
  res.status(200).json(Student);
});

exports.getStudents = catchAsyncError(async (req, res, next) => {
 
  if (req.query.lang == "en") {
    const Student = await StudentModel.find({})
      .populate([
        { path: "activity", select: "title_en -_id" },
        { path: "trip", select: "title_en -_id" },
      ])
      .select("-name_ar -Specialization_en ");
    !Student && next(new AppError("Student not found", 404));
    Student && res.status(200).json({ result: Student });
  } else {
    const Student = await StudentModel.find({})
      .select("-name_en -Specialization_en ")
      .populate([
        { path: "activity", select: "title_en -_id" },
        { path: "trip", select: "title_en -_id" },
      ])
    !Student && next(new AppError("غير موجود", 404));
    Student && res.status(200).json({ result: Student });
  }
});
exports.getٍSpcificStudent = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.query.lang == "en") {
    const Student = await StudentModel.findById(id)
      .select("-name_ar -Specialization_ar")
      .populate("activity");
    !Student && next(new AppError("not found ", 404));
    Student && res.status(200).json({ result: Student });
  } else {
    const Student = await StudentModel.findById(id).select(
      "-name_en -Specialization_en"
    );
    !Student && next(new AppError("غير موجود", 404));
    Student && res.status(200).json({ result: Student });
  }
});
// update the Student {description and name} of youth Student
exports.updateStudent = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const Student = await StudentModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !Student && next(new AppError("Student not found", 404));
  Student && res.status(200).json({ result: Student });
});
// delete the Student {description and name} of youth Student
exports.deleteStudent = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const Student = await StudentModel.findByIdAndDelete(id, {
    new: true,
  });
  !Student && next(new AppError("Student not found", 404));
  Student && res.status(200).json("deleted");
});


