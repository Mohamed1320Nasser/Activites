const { Types } = require("mongoose");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const activityModel = require("../activities/activity.model");
const StudentModel = require("../student/student.model");

exports.enrollActivity = catchAsyncError(async (req, res, next) => {
  const activityId = Types.ObjectId(req.params.id);
  const StudentId = req.Student._id;
  const Student = await StudentModel.findById(StudentId);
  if (Student) {
    if (Student.activity.includes(activityId))
      return next(new AppError("Activity already enrolled", 400));
    if (Student.activity.length < 3) {
      const activity = await activityModel.findById(activityId);
      if (!activity) return next(new AppError("Activity not found", 404));
      const enrollStudent = await StudentModel.findByIdAndUpdate(
        StudentId,
        {
          $addToSet: { activity: activityId },
        },
        { new: true }
      );
      if (enrollStudent) {
        await activityModel.findByIdAndUpdate(activityId, {
          $inc: { numRecorded: 1 },
        });
        res.status(200).json({ message: "enroll success" });
      }
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
    await StudentModel.findByIdAndUpdate(
      StudentId,
      {
        $pull: { activity: id },
      },
      { new: true }
    );

    await activityModel.findByIdAndUpdate(activityId, {
      $inc: { numRecorded: -1 },
    });
    res.status(200).json({ message: "cancel" });
  } else {
    return next(new AppError("Student not found", 404));
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
