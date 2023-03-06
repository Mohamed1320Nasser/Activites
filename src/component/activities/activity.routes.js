
const { fileMixUpload, uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatActivity,
  getActivities,
  getٍSpcificActivity,
  updateActivity,
  deleteActivity,
  removeImageofromActivity,
  AddImageoToActivity,
} = require("./activity.service");

const router = require("express").Router();
let fields=[{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 5 }]
router.route("/").post(fileMixUpload(fields,"activity"),creatActivity).get(getActivities);
router
  .route("/:id")
  .get(getٍSpcificActivity)
  .put(updateActivity)
  .delete(deleteActivity);
  router.put("/removeImage/:id",removeImageofromActivity).put("/addImage/:id",uploadSingleImage("image","activity"),AddImageoToActivity)

//   router.route("/:id").put(updateYouthWelfare).delete(deleteYouthWelfare);
module.exports = router;
