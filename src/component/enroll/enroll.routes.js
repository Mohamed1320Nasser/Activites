
const { protectedRoutes } = require("../student/student.auth");
const { enrollActivity, cancel, enrollTrip } = require("./enroll.services");

const router = require("express").Router({mergeParams: true});
    router.get("/activity",protectedRoutes,enrollActivity)
    router.get("/cancel",protectedRoutes,cancel)
    router.get("/trips",protectedRoutes,enrollTrip)
module.exports = router;
