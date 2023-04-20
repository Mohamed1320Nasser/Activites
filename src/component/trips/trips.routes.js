const { uploadSingleImage } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { TripsValidation } = require("../validations/trips.validate");
const {
  creatTrip,
  getTrips,
  getٍSpcificTrip,
  updateTrip,
  deleteTrip,
} = require("./trips.service");

const router = require("express").Router();
router
  .route("/")
  .post(
    // protectedRoutes,
    // allowedTo("admin"),
    // TripsValidation,
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
