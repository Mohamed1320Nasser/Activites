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
} = require("./student.auth");
const { getProfile, updateProfile, ChangePass } = require("./student.profile");
const router = require("express").Router();


// student profile routes
router
  .get("/myProfile", protectedRoutes, getProfile)
  .put("/myProfile/update",uploadSingleImage("image", "Student"),protectedRoutes, updateProfile)
  .put("/myProfile/changePassword", protectedRoutes, allowedTo("student"), ChangePass);

// admin routes
router
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), creatStudent)
  .get(protectedRoutes, allowedTo("admin"), getStudents);
router.get("/verfy-email", verifyEmail);
router
  .route("/:id")
  .get(getٍSpcificStudent, protectedRoutes, allowedTo("admin", "student"))
  .put(protectedRoutes, allowedTo("admin"), updateStudent)
  .delete(protectedRoutes, allowedTo("admin"), deleteStudent);

//  student authentication
router
  .post("/signUp", SignUp)
  .post("/signin", Signin);
router.post("/logout", Signout);



module.exports = router;
