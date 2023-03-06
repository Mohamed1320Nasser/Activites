const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatYouthWelfare,
  getYouthWelfare,
  updateYouthWelfare,
  deleteYouthWelfare,
} = require("./YouthWelfare.service");

const router = require("express").Router();
router.route("/").post(creatYouthWelfare).get(getYouthWelfare);
router.route("/:id").put(updateYouthWelfare).delete(deleteYouthWelfare);
module.exports = router;
