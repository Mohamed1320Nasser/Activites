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
    if (Student.activity.includes(activityId)){
      if(req.query.lang=="en")  return res.status(200).json({message: 'Activity already enrolled'})
      return  res.status(200).json({message: 'انت بالفعل مسجل من قبل في هذا النشاط'})
    }
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
       if(req.query.lang=="en") return res.status(200).json({ message: "enroll success" });
       res.status(200).json({ message:"تم التسجبل بنجاح" })
      }
    } else {
      if(req.query.lang=="en") return res.status(200).json({message:"you enroll more than 3 activities"});
      res.status(200).json({message:"لا يمكن التسجيل في اكثر من 3 انشطة"})
    }
  } else {
    return next(new AppError("Student not found", 404));
  }
});
//  Cancellation of activity enrolled
exports.cancel = catchAsyncError(async (req, res, next) => {
  const activityId = Types.ObjectId(req.params.id);
  const StudentId = req.Student._id;
  const Student = await StudentModel.findById(StudentId);
  if (Student) {
    await StudentModel.findByIdAndUpdate(
      StudentId,
      {
        $pull: { activity: activityId },
      },
      { new: true }
    );
    await activityModel.findByIdAndUpdate(activityId, {
      $inc: { numRecorded: -1 },
    });
    if(req.query.lang=="en") return res.status(200).json({ message: "Successfully cancel the activity " });
    return res.status(200).json({ message: "الغاء التسجيل بنجاح " });
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
