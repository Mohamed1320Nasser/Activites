const { uploadSingleImage } = require("../../utils/uploadFile");
const { TripsValidation } = require("../validations/trips.validate");
const {
  creatTrip,
  getTrips,
  getٍSpcificTrip,
  updateTrip,
  deleteTrip,
} = require("./trips.service");

const router = require("express").Router();
router.route("/").post(TripsValidation,uploadSingleImage("image","trips"),creatTrip).get(getTrips);
router.route("/:id").get(getٍSpcificTrip).put(updateTrip).delete(deleteTrip);
module.exports = router;
