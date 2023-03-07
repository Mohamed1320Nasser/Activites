const { uploadSingleImage, fileMixUpload } = require("../../utils/uploadFile");
const {
  creatYouthWelfare,
  getYouthWelfare,
  updateYouthWelfare,
} = require("./YouthWelfare.service");
let fields=[{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 5 }]
const router = require("express").Router();
router.route("/").post(fileMixUpload(fields,"category"),creatYouthWelfare).get(getYouthWelfare);
router.route("/:id").put(updateYouthWelfare)
module.exports = router;
