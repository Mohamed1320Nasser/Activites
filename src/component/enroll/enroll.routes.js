
const { protectedRoutes } = require("../student/student.auth");
const { enrollActivity, cancel, enrollTrip } = require("./enroll.services");

const router = require("express").Router({mergeParams: true});
    router.post("/activity",protectedRoutes,enrollActivity)
    router.post("/cancel",protectedRoutes,cancel)
    router.post("/trips",protectedRoutes,enrollTrip)
module.exports = router;
