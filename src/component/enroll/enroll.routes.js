const { protectedRoutes } = require("../user/user.auth");
const { enrollActivity, cancel, enrollTrip } = require("./enroll.services");

const router = require("express").Router();


    router.post("/add/:id",protectedRoutes,enrollActivity)
    router.post("/cancel/:id",protectedRoutes,cancel)
    router.post("/enrollTrips/:id",protectedRoutes,enrollTrip)
module.exports = router;
