
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const StudentModel = require("./student.model");
// to creat Student
module.exports.creatStudent = catchAsyncError(async (req, res, next) => {
  const findStudent = await StudentModel.findOne({ email: req.body.email });
  if (findStudent) return next(new AppError("Student already exists", 500));
  const Student = new StudentModel(req.body);
  await Student.save();
  return res.status(200).json(Student);
});
exports.getStudents = catchAsyncError(async (req, res, next) => {
  const lang = req.query.lang || "ar";
  const nameField = lang === "ar" ? "-name_en -Specialization_en" : "-name_ar -Specialization_ar";
  const selectField = lang === "ar" ? "title_ar" : "title_en";
  const Student = await StudentModel.find({})
    .select(nameField)
    .populate([
      { path: "activity", select: selectField, _id: 0 },
      { path: "trip", select: selectField, _id: 0 },
    ]);
  if (!Student || Student.length === 0) {
    return next(new AppError("Students not found", 404));
  }

  return res.status(200).json({ result: Student });
});

exports.getٍSpcificStudent = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const lang = req.query.lang || "ar";
  const nameField = lang === "ar" ? "-name_en -Specialization_en" : "-name_ar -Specialization_ar";
  const selectField = lang === "ar" ? "title_ar -_id" : "title_en -_id";
  const Student = await StudentModel.findById(id)
    .select(nameField)
    .populate([
      { path: "activity", select: selectField, _id: 0 },
      { path: "trip", select: selectField, _id: 0 },
    ]);
  if (!Student || Student.length === 0) {
    return next(new AppError("Students not found", 404));
  }
  return res.status(200).json({ result: Student });
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

