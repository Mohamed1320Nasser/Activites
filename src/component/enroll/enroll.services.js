const {Types} = require("mongoose");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const StudenModel = require("../student/student.model");

exports.enrollActivity = catchAsyncError(async (req, res, next) => {
  const id = Types.ObjectId(req.params);
  const StudenId = req.Studen._id;
  const Studen = await StudenModel.findById(StudenId);
  if (Studen) {
    if (Studen.activity.length < 3) {
      const enrollStuden = await StudenModel.findByIdAndUpdate(
        StudenId,
        {
          $addToSet: { activity: id },
        },
        { new: true }
      );
      res.status(200).json({ message: "added", result: enrollStuden });
    } else {
      res.status(401).json("you enroll more than 3 activities");
    }
  } else {
   return next(new AppError("Studen not found", 404));
  }
});

//  Cancellation of activity enrolled
exports.cancel = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const StudenId = req.Studen._id;
  const Studen = await StudenModel.findById(StudenId);
  if (Studen) {
    const cancelStuden = await StudenModel.findByIdAndUpdate(
      StudenId,
      {
        $pull: { activity: id },
      },
      { new: true }
    );
    res.status(200).json({ message: "cancel", result: cancelStuden });
  } else {
    return  next(new AppError("Studen not found", 404));
  }
});

// regester in trips

exports.enrollTrip = catchAsyncError(async (req, res, next) => {
  const id = Types.ObjectId(req.params.id);
  const StudenId = req.Studen._id;
  const Studen = await StudenModel.findById(StudenId);
  if (Studen) {
    const enrollStuden = await StudenModel.findByIdAndUpdate(
      StudenId,
      {
        $addToSet: { trip: id },
      },
      { new: true }
    );
    res.status(200).json({ message: "success", result: enrollStuden });
  } else {
   return next(new AppError("Studen not found", 404));
  }
});
