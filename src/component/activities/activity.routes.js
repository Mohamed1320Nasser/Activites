const { fileMixUpload, uploadSingleImage, checkImageUpload } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { ActivityValidation } = require("../validations/activity.validate");
const { validation } = require("../validations/validation.meddle");
const {
  creatActivity,
  getActivities,
  getٍSpcificActivity,
  updateActivity,
  deleteActivity,
  removeImageofromActivity,
  AddImageoToActivity,
  rateActivity,
} = require("./activity.service");
const enroll = require("../enroll/enroll.routes");
const router = require("express").Router({mergeParams: true});
router.use("/:id/enroll", enroll);
let fields = [
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 4 },
];
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    fileMixUpload(fields, "activity"),
    creatActivity
  )
  .get(getActivities);
router
  .route("/:id")
  .get(getٍSpcificActivity)
  .put(protectedRoutes, allowedTo("admin"), updateActivity)
  .delete(protectedRoutes, allowedTo("admin"), deleteActivity);
router
  .put(
    "/removeImage/:id",
    protectedRoutes,
    allowedTo("admin"),
    removeImageofromActivity
  )
  .put(
    "/addImage/:id",
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "activity"),
    checkImageUpload,
    AddImageoToActivity
  );
  router.post("/:id/rate",protectedRoutes,allowedTo("student"),rateActivity)

module.exports = router;
