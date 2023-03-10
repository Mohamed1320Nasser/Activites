const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { getHomePage, updateHomePage } = require("./Home.service");

const router = require("express").Router();
router.route("/").get(getHomePage);
router.route("/:id").put(protectedRoutes, allowedTo("admin"), updateHomePage);
module.exports = router;
