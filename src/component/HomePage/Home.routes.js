const { uploadSingleImage, checkImageUpload } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { getHomePage, updateHomePage, AddImageoToHome, removeImageofromHome } = require("./Home.service");

const router = require("express").Router();
router.route("/").get(getHomePage);
router.route("/:id").put(protectedRoutes, allowedTo("admin"), updateHomePage);
router.route("/addImage/:id").post(uploadSingleImage("image", "Home"),checkImageUpload, AddImageoToHome);
router.route("/removeImage/:id").post(protectedRoutes, allowedTo("admin"), removeImageofromHome);
module.exports = router;
