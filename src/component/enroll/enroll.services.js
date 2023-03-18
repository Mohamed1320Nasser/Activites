const {Types} = require("mongoose");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const StudentModel = require("../student/student.model");

exports.enrollActivity = catchAsyncError(async (req, res, next) => {
  console.log(req.Student);
  const id = Types.ObjectId(req.params.id);
  const StudentId = req.Student._id;
  console.log(StudentId);
  const Student = await StudentModel.findById(StudentId);
  if (Student) {
    if (Student.activity.length < 3) {
      const enrollStudent = await StudentModel.findByIdAndUpdate(
        StudentId,
        {
          $addToSet: { activity: id },
        },
        { new: true }
      );
      res.status(200).json({ message: "added", result: enrollStudent });
    } else {
      res.status(401).json("you enroll more than 3 activities");
    }
  } else {
   return next(new AppError("Student not found", 404));
  }
});

//  Cancellation of activity enrolled
exports.cancel = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const StudentId = req.Student._id;
  const Student = await StudentModel.findById(StudentId);
  if (Student) {
    const cancelStudent = await StudentModel.findByIdAndUpdate(
      StudentId,
      {
        $pull: { activity: id },
      },
      { new: true }
    );
    res.status(200).json({ message: "cancel", result: cancelStudent });
  } else {
    return  next(new AppError("Student not found", 404));
  }
});

// regester in trips

exports.enrollTrip = catchAsyncError(async (req, res, next) => {
  const id = Types.ObjectId(req.params.id);
  const StudentId = req.Student._id;
  const Student = await StudentModel.findById(StudentId);
  if (Student) {
    const enrollStudent = await StudentModel.findByIdAndUpdate(
      StudentId,
      {
        $addToSet: { trip: id },
      },
      { new: true }
    );
    res.status(200).json({ message: "success", result: enrollStudent });
  } else {
   return next(new AppError("Student not found", 404));
  }
});
