const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { sendNotification } = require("./notification.emai");

const router = require("express").Router();

router.post("/", sendNotification);

module.exports = router;
