const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatStudent,
  getStudents,
  getٍSpcificStudent,
  updateStudent,
  deleteStudent,
} = require("./student.service");
const {
  SignUp,
  Signin,
  verifyEmail,
  Signout,
  protectedRoutes,
  allowedTo,
  adminActive,
} = require("./student.auth");
const {checkImageUpload} = require('../../utils/uploadFile')
const { getProfile, updateProfile, ChangePass, resetPass, verifyCode, updatePic } = require("./student.profile");
const { validation } = require("../../utils/validation.meddle");
const { loginSchema, changePassSchema, updateProfileSchema, restPassValidation, verifyPassValidation, studentSchema } = require("./student.validate");
const router = require("express").Router();

// student profile routes
router
  .get("/myProfile", protectedRoutes, getProfile)
  .put("/myProfile/update", protectedRoutes,validation(updateProfileSchema), updateProfile)
  .put("/myProfile/update/image", protectedRoutes, uploadSingleImage("image"),checkImageUpload, updatePic)
  .put("/myProfile/changePassword", protectedRoutes, allowedTo("student"), validation(changePassSchema), ChangePass)
  .post('/resetPass', validation(restPassValidation), resetPass).post('/verifyCode', validation(verifyPassValidation), verifyCode)
// admin routes
router
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), validation(studentSchema), creatStudent)
  .get(protectedRoutes, allowedTo("admin"), getStudents);
router.get("/verfy-email", verifyEmail);
router
  .route("/:id")
  .get(getٍSpcificStudent, protectedRoutes, allowedTo("admin", "student"))
  .put(protectedRoutes, allowedTo("admin"), updateStudent)
  .delete(protectedRoutes, allowedTo("admin"), deleteStudent);


//  student authentication
router
  .post("/signUp", validation(studentSchema), SignUp)
  .post("/signin", validation(loginSchema), Signin)
  .get("/active/:studentId",protectedRoutes, allowedTo("admin"), adminActive);
router.post("/logout", Signout);

module.exports = router;
