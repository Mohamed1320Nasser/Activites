const { fileMixUpload } = require("../../utils/uploadFile");
const {
  creatYouthWelfare,

  getHomePage,
  updateHomePage,
} = require("./Home.service");
let fields = [
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 5 },
];
const router = require("express").Router();
router
  .route("/")
  .post(fileMixUpload(fields, "category"), creatYouthWelfare)
  .get(getHomePage);
router.route("/:id").put(updateHomePage);
module.exports = router;
