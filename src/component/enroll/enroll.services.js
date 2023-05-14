// const { Types } = require("mongoose");
const mongoose = require("mongoose");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const activityModel = require("../activities/activity.model");
const StudentModel = require("../student/student.model");
const tripsModel= require('../trips/trips.model')

exports.enrollActivity = catchAsyncError(async (req, res, next) => {
  const activityId = mongoose.Types.ObjectId(req.params.id);
  const studentId = req.Student._id;

  // Retrieve the student document as a plain JavaScript object
  const student = await StudentModel.findById(studentId).lean();

  if (student) {
    if (student.activity.includes(activityId)) {
      const message = req.query.lang == "en" ? 'Activity already enrolled' : 'انت بالفعل مسجل من قبل في هذا النشاط';
      return res.status(200).json({ message });
    }

    if (student.activity.length < 3) {
      // Retrieve only the required fields for the activity document
      const activity = await activityModel.findById(activityId).select('numRecorded').lean();
      if (!activity) return next(new AppError("Activity not found", 404));

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Use bulkWrite operation to update multiple documents in a single roundtrip
        const [enrollStudent, updateActivity] = await Promise.all([
          StudentModel.findByIdAndUpdate(
            studentId,
            { $addToSet: { activity: activityId } },
            { new: true, session }
          ),
          activityModel.updateOne(
            { _id: activityId },
            { $inc: { numRecorded: 1 } },
            { session }
          )
        ]);
        await session.commitTransaction();
        const message = req.query.lang == "en" ? 'enroll success' : 'تم التسجبل بنجاح';
        res.status(200).json({ message });
      } catch (error) {
        await session.abortTransaction();
        return next(error);
      } finally {
        session.endSession();
      }
    } else {
      const message = req.query.lang == "en" 
      ? 'you enroll more than 3 activities' 
      : ' لا يمكن التسجيل في اكثر من 3 انشطة'
    }
  }
})
// const activityId = Types.ObjectId(req.params.id);
// const StudentId = req.Student._id;
// const Student = await StudentModel.findById(StudentId);
// if (Student) {
//   if (Student.activity.includes(activityId)) {
//     if (req.query.lang == "en") return res.status(200).json({ message: 'Activity already enrolled' })
//     return res.status(200).json({ message: 'انت بالفعل مسجل من قبل في هذا النشاط' })
//   }
//   if (Student.activity.length < 3) {
//     const activity = await activityModel.findById(activityId);
//     if (!activity) return next(new AppError("Activity not found", 404));
//     const enrollStudent = await StudentModel.findByIdAndUpdate(
//       StudentId,
//       {
//         $addToSet: { activity: activityId },
//       },
//       { new: true }
//     );
//     if (enrollStudent) {
//       await activityModel.findByIdAndUpdate(activityId, {
//         $inc: { numRecorded: 1 },
//       });
//       if (req.query.lang == "en") return res.status(200).json({ message: "enroll success" });
//       res.status(200).json({ message: "تم التسجبل بنجاح" })
//     }
//   } else {
//     if (req.query.lang == "en") return res.status(200).json({ message: "you enroll more than 3 activities" });
//     res.status(200).json({ message: "لا يمكن التسجيل في اكثر من 3 انشطة" })
//   }
// } else {
//   return next(new AppError("Student not found", 404));
// }
// });
//  Cancellation of activity enrolled
exports.cancel = catchAsyncError(async (req, res, next) => {
  const activityId = mongoose.Types.ObjectId(req.params.id);
  const studentId = req.Student._id;
  
  const student = await StudentModel.findOneAndUpdate(
    { _id: studentId, activity: activityId },
    { $pull: { activity: activityId } },
    { new: true, lean: true, select: 'activity' }
  );

  if (!student) {
    return next(new AppError("Student or activity not found", 404));
  }

  await activityModel.findOneAndUpdate(
    { _id: activityId },
    { $inc: { numRecorded: -1 } },
    { new: true }
  );

  if (req.query.lang == "en") {
    return res.status(200).json({ message: "Successfully cancel the activity" });
  } else {
    return res.status(200).json({ message: "الغاء التسجيل بنجاح" });
  }
});

// regester in trips /////////////////////////////
exports.enrollTrip = catchAsyncError(async (req, res, next) => {
  const tripsId = Types.ObjectId(req.params.id);
  const studentId = req.Student._id;
  
  const [student, trip] = await Promise.all([
    StudentModel.findOneAndUpdate(
      { _id: studentId },
      { $addToSet: { trip: tripsId } },
      { new: true, lean: true, select: 'trip' }
    ),
    tripsModel.findOneAndUpdate(
      { _id: tripsId },
      { $inc: { numRecorded: 1 } },
      { new: true, lean: true, select: 'numRecorded' }
    )
  ]);
  if (!student) {
    return next(new AppError("Student not found", 404));
  }

  if (!trip) {
    return next(new AppError("Trip not found", 404));
  }

  res.status(200).json({ message: "success", result: student });
});

