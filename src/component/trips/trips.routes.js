const { uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatTrip,
  getTrips,
  getٍSpcificTrip,
  updateTrip,
  deleteTrip,
} = require("./trips.service");

const router = require("express").Router();
router.route("/").post(uploadSingleImage("image","trips"),creatTrip).get(getTrips);
router.route("/:id").get(getٍSpcificTrip).put(updateTrip).delete(deleteTrip);

//   router.route("/:id").put(updateYouthWelfare).delete(deleteYouthWelfare);
module.exports = router;
