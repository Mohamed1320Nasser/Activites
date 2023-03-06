const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatUser,
  getUsers,
  getٍSpcificUser,
  updateUser,
  deleteUser,
  ChangePass,
} = require("../user/user.service");
const { SignUp, Signin, verifyEmail } = require("./user.auth");

const router = require("express").Router();
router.route("/").post(uploadSingleImage("image","User"),creatUser).get(getUsers);
router.get("/verfy-email",verifyEmail)
router.route("/:id").get(getٍSpcificUser).put(updateUser).delete(deleteUser);
router.post("/signUp",uploadSingleImage("image","User"), SignUp).post("/signin", Signin);
router.put("/changePassword", ChangePass);
module.exports = router;
