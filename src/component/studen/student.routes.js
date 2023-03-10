const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatStuden,
  getStudens,
  getٍSpcificStuden,
  updateStuden,
  deleteStuden,
  ChangePass,
} = require("./student.service");
const { studenValidation } = require("../validations/student.validate");
const { SignUp, Signin, verifyEmail } = require("./student.auth");

const router = require("express").Router();
router.route("/").post(studenValidation,uploadSingleImage("image","Studen"),creatStuden).get(getStudens);
router.get("/verfy-email",verifyEmail)
router.route("/:id").get(getٍSpcificStuden).put(updateStuden).delete(deleteStuden);
router.post("/signUp",studenValidation,uploadSingleImage("image","Studen"), SignUp).post("/signin", Signin);
router.put("/changePassword", ChangePass);
module.exports = router;
