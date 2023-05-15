const { catchAsyncError } = require("../../utils/catchAsyncErr");
const messageModel = require("./message.model");
exports.CreatMessage = catchAsyncError(async (req, res, next) => {
  const { message } = req.body;
  const studentId = req.Student._id;
  const MSG = await new messageModel({
    message: message,
    student: studentId,
  });
  MSG.save();
  res.status(200).json({ message: "send message successfully", status: true });
});
exports.getMassages = catchAsyncError(async (req, res, next) => {
  const MSG = await messageModel.find({})
  !MSG && next(new AppError("messages not found", " 404"));
  MSG && res.status(200).json({ result: MSG, status: true });
});
exports.getOneMassage = catchAsyncError(async (req, res, next) => {
    const MSG = await messageModel.findById(req.params.id).populate({ path: "student" });
    !MSG && next(new AppError("message not found", " 404"));
    MSG && res.status(200).json({ result: MSG, status: true });
  });
exports.deleteAllMessage = catchAsyncError(async (req, res, next) => {
    await messageModel.collection.drop((error) => {
    if (error) {
      res.status(400).json({ messge: "Error dropping collection: ", error });
    } else {
      res.status(200).json({ messge: "Collection dropped successfully" });
    }
  });
});
exports.deleteOneMessage=catchAsyncError(async (req,res,next)=>{
    await messageModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ messge: "message deleted successfully" });
})

