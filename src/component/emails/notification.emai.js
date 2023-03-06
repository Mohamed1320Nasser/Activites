const userModel = require("../user/user.model");
const { Types } = require("mongoose");
const { catchAsyncError } = require("../../utils/catchAsyncErr");


const getStudents = async (activityName) => {
  const students = await userModel.find({
    activity: Types.ObjectId(activityName),
  }).select("email -_id" );
  if (students.length ==0 ) {
    console.log("students not found");
  } else {
    // console.log(students);
    return students;
  }
};
exports.sendNotification = catchAsyncError( async (req, res, next) => {
 
    res.json( await getStudents("6403b482ac496178ab47fe87"));
})
