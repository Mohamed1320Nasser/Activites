const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatStudent,
  getStudents,
  getٍSpcificStudent,
  updateStudent,
  deleteStudent,
  ChangePass,
} = require("./student.service");

const { SignUp, Signin, verifyEmail } = require("./student.auth");
const { studentValidation } = require("../validations/student.validate");

const router = require("express").Router();
router.route("/").post(studentValidation,uploadSingleImage("image","Student"),creatStudent).get(getStudents);
router.get("/verfy-email",verifyEmail)
router.route("/:id").get(getٍSpcificStudent).put(updateStudent).delete(deleteStudent);
router.post("/signUp",studentValidation,uploadSingleImage("image","Student"), SignUp).post("/signin", Signin);
router.put("/changePassword", ChangePass);
module.exports = router;
