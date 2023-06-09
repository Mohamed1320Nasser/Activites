const bcrypt = require("bcrypt");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { deleteFromCloudinary, uploadToCloudinary } = require("../../utils/cludinary");
const StudentModel = require("./student.model");
const { transporter } = require("../emails/transporter.email");

// get profile student information
exports.getProfile = catchAsyncError(async (req, res, next) => {
  const lang = req.query.lang || "en";
  const selectField = lang === "en" ? "title_en" : "title_ar";
  const Student = await StudentModel.findById(req.Student._id).populate([
    { path: "activity", select: selectField, _id: 0 },{path:"trip",select:selectField}
  ]);
  if (!Student) {
    return next(new AppError("Student not found", 404));
  }
  return res.status(200).json({ Student });
});
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const { fullName, phone } = req.body
  const studentId = req.Student?._id;
  if (!studentId) {
    return res.status(400).json({ message: "Invalid student ID" });
  }
  let updateData = { fullName, phone };
  if (req.file) {
    const result = await uploadToCloudinary(req.file)
    if (req.Student.cloudinary_id !== "default") {
      await deleteFromCloudinary(req.Student.cloudinary_id);
    }
    updateData.image = result.secure_url
    updateData.cloudinary_id = result.public_id
  }
  const updatedStudent = await StudentModel.findByIdAndUpdate(
    studentId,
    updateData,
    { new: true }
    );
  if (!updatedStudent) {
    return res.status(404).json({ message: "Student not found" });
  }
  return res.status(200).json({ message: "Profile updated successfully" });

});
exports.updatePic= catchAsyncError(async (req, res, next) => {
  const studentId = req.Student?._id;
  if (!studentId) return res.status(400).json({ message: "Invalid student ID" });
  const result = await uploadToCloudinary(req.file)
  if (req.Student.cloudinary_id !== "default") {
    await deleteFromCloudinary(req.Student.cloudinary_id);
  }
  req.body.image = result.secure_url
  req.body.cloudinary_id = result.public_id
  const updateStudentPic = await StudentModel.findByIdAndUpdate(
    studentId,
    req.body,
    { new: true }
    );
    if (!updateStudentPic) return res.status(404).json({ message: "Student not found" });
    return res.status(200).json({ message: "Profile Image updated successfully" });
})
module.exports.ChangePass = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  let match = await bcrypt.compare(oldPassword, req.Student.password);
  if (match) {
    let hash = await bcrypt.hash(newPassword, Number(process.env.saltRounds));
    await StudentModel.findByIdAndUpdate(req.Student._id, { password: hash });
    return  res.status(200).json({ message: " change password is succes" });
  } else {
    return next(new AppError("Old password is incorrect", 401));
  }
});



// Password reset route

exports.resetPass = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  try {
    // Find the user in MongoDB
    const user = await StudentModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a random number between 100000 and 999999
    const randomCode = Math.floor(Math.random() * 900000) + 100000;
    // Hash the random code
    const hashedCode = await bcrypt.hash(
      randomCode.toString(),
      Number(process.env.saltRounds)
    );

    // Save the hashed code in the user's document in MongoDB
    user.resetCode = hashedCode;
    await user.save();

    // Send an email to the user with the verification code
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password reset",
      text: `Your verification code is: ${randomCode}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ message: "Server error" });
      else return res.status(200).json({ message: "Verification code sent" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Verify code and reset password route
exports.verifyCode = catchAsyncError(async (req, res, next) => {
  const { email, code, password } = req.body;
  try {
    // Find the user in MongoDB
    const user = await StudentModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare the code entered by the user to the hashed code in the user's document in MongoDB
    const isCodeValid = await bcrypt.compare(code, user.resetCode);

    if (!isCodeValid) {
      return res.status(400).json({ message: "Invalid code" });
    }

    // Update the user's password in MongoDB
    user.password = password;
    user.resetCode = null;
    await user.save();

    // Return a success message
    return  res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
  }
});
