
const { protectedRoutes, checkActiveStudent } = require("../student/student.auth");
const { enrollActivity, cancel, enrollTrip } = require("./enroll.services");

const router = require("express").Router({mergeParams: true});
    router.get("/activity",protectedRoutes,checkActiveStudent,enrollActivity)
    router.get("/cancel",protectedRoutes,cancel)
    router.get("/trip",protectedRoutes,checkActiveStudent,enrollTrip)
module.exports = router;
