const ActivityModel = require("./activity.model");
const refactor = require("../Handler/HandleRefactor");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { Types } = require("mongoose");
const AppError = require("../../utils/AppError");

// to creat Activity
module.exports.creatActivity = refactor.createOne(ActivityModel, "activity");
// to get the All Activities {description and name} of youth Activity
exports.getActivities = refactor.getAll(ActivityModel);

// get specific Activity by id
exports.getٍSpcificActivity = refactor.getOne(ActivityModel);

// update the Activity {description and name} of youth Activity
exports.updateActivity = refactor.updateOne(ActivityModel);

// remove image frome Activity
exports.removeImageofromActivity = refactor.removeImage(ActivityModel);

// add image to Activity
exports.AddImageoToActivity = refactor.addImage(ActivityModel, "category");

// delete the Activity {description and name} of youth Activity
exports.deleteActivity = refactor.deleteOne(ActivityModel);

exports.rateActivity = catchAsyncError(async (req, res, next) => {
  const activityId = req.params.id;
  const studentId=req.Student._id
  const rate = req.body.rate;
  const IsEnroll = req.Student.activity.includes(Types.ObjectId(activityId));
  if (IsEnroll) {
    const activity = await ActivityModel.findById(activityId);
    const existingRating = activity.ratings.find(
      (rating) => rating.studentId.toString() === studentId.toString()
    );
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "You have already rated this activity" });
    }
    activity.ratings.push({ studentId, rate });

    // Update the averageRating and ratingCount fields
    const ratingCount = activity.ratingCount + 1;
    const totalRating = activity.ratings.reduce(
      (sum, rating) => sum + rating.rate,
      0
    );
    const averageRating = totalRating / ratingCount;
    // Update the activity document in the database
    await activity.updateOne({
      $set: { ratingCount, averageRating },
      $push: { ratings: { studentId, rate } },
    });
    return res.status(200).json({ message: "Rating added successfully" });
  } else {
    return next(new AppError("You are not enrolled in this activity", 401));
  }
});
