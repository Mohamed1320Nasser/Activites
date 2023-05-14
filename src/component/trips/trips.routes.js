const { uploadSingleImage } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { TripsValidation } = require("./trips.validate");
const {
  creatTrip,
  getTrips,
  getٍSpcificTrip,
  updateTrip,
  deleteTrip,
} = require("./trips.service");
const enroll = require("../enroll/enroll.routes");
const { validation } = require("../../utils/validation.meddle");
const router = require("express").Router();
router.use("/:id/enroll", enroll);
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
   validation(TripsValidation),
    uploadSingleImage("image", "trips"),
    creatTrip
  )
  .get(getTrips);
router
  .route("/:id")
  .get(getٍSpcificTrip)
  .put(protectedRoutes, allowedTo("admin"), updateTrip)
  .delete(protectedRoutes, allowedTo("admin"), deleteTrip);
module.exports = router;
