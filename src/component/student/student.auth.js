const StudentModel = require("./student.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const { sendEmail } = require("../emails/verification.email");

module.exports.SignUp = catchAsyncError(async (req, res, next) => {
  const IsStudent = await StudentModel.findOne({ email: req.body.email });
  if (IsStudent) return next(new AppError("Student is already exists", 401));
  req.body.emailToken=crypto.randomBytes(16).toString('hex');
  if(req.file){
  const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
    folder: "profile Images",
  });
  req.body.image= secure_url
}
  const Student = new StudentModel(req.body);
  await Student.save();
  sendEmail(Student,req.headers.host);
  res.status(200).json( {message:"verification email is sent to your email account",Student} );
});
exports.verifyEmail= catchAsyncError(async (req, res, next) => {
  console.log("test");
    const {token} = req.query
    const Student= await StudentModel.findOne({emailToken:token});
if(Student){
    await StudentModel.findByIdAndUpdate(Student._id,{emailToken:null,Isverified:true});

res.status(200).json("email verified");
}else{
  console.log( "email is not verified" );
}
})
module.exports.Signin = catchAsyncError(async (req, res, next) => {
  const Student = await StudentModel.findOne({ email: req.body.email });
  if (!Student || !(await bcrypt.compare(req.body.password, Student.password)))
    return next(new AppError("incorrect email or password", 401));

   if(Student.Isverified == false  )  return next(new AppError("email is not verified", 401));
  const token = jwt.sign(
    { StudentId: Student._id, name: Student.name },
    process.env.secrit_key
  );
  res.status(200).json({ token });
});
exports.protectedRoutes = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token inprovided", 401));
  let decoded = jwt.verify(token, process.env.secrit_key);
  const Student = await StudentModel.findById(decoded.StudentId);
  if (!Student) return next(new AppError("Student not found", 401));
  if (Student.passwordChangeAt) {
    let changePassword = parseInt(Student.passwordChangeAt.getTime() / 100);
    if (changePassword > decoded.iat)
      return next(new AppError("password changed please login agine", 401));
  }
  req.Student = Student;

  next();
});
exports.allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.Student.role))
      return next(new AppError("You don't have permission to do this", 401));
    next();
  });
};

