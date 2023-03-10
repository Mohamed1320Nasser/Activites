
const { protectedRoutes } = require("../student/student.auth");
const { enrollActivity, cancel, enrollTrip } = require("./enroll.services");

const router = require("express").Router();


    router.post("/enrollActivity/:id",protectedRoutes,enrollActivity)
    router.post("/cancelActivity/:id",protectedRoutes,cancel)
    router.post("/enrollTrips/:id",protectedRoutes,enrollTrip)
module.exports = router;
