const {Types} = require("mongoose");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const UserModel = require("../user/user.model");

exports.enrollActivity = catchAsyncError(async (req, res, next) => {
  const id = Types.ObjectId(req.params);
  const userId = req.user._id;
  const User = await UserModel.findById(userId);
  if (User) {
    if (User.activity.length < 3) {
      const enrollUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $addToSet: { activity: id },
        },
        { new: true }
      );
      res.status(200).json({ message: "added", result: enrollUser });
    } else {
      res.status(200).json("you enroll more than 3 activities");
    }
  } else {
    next(new AppError("User not found", 404));
  }
});

//  Cancellation of activity enrolled
exports.cancel = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  const User = await UserModel.findById(userId);
  if (User) {
    const cancelUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { activity: id },
      },
      { new: true }
    );
    res.status(200).json({ message: "cancel", result: cancelUser });
  } else {
    next(new AppError("User not found", 404));
  }
});

// regester in trips

exports.enrollTrip = catchAsyncError(async (req, res, next) => {
  const id = Types.ObjectId(req.params.id);
  const userId = req.user._id;
  const User = await UserModel.findById(userId);
  if (User) {
    const enrollUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { trip: id },
      },
      { new: true }
    );
    res.status(200).json({ message: "success", result: enrollUser });
  } else {
    next(new AppError("User not found", 404));
  }
});
