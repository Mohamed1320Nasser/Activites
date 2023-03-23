const { protectedRoutes, allowedTo } = require("../student/student.auth");
const {
  CreatMessage,
  getMassages,
  deleteAllMessage,
  getOneMassage,
  deleteOneMessage,
} = require("./message.service");

const router = require("express").Router();

router
  .post("/", protectedRoutes, CreatMessage)
  .get("/", protectedRoutes, allowedTo("admin"), getMassages)
  .delete("/", protectedRoutes, allowedTo("admin"), deleteAllMessage);
router
  .route("/:id")
  .get(protectedRoutes, allowedTo("admin"), getOneMassage)
  .delete(protectedRoutes, allowedTo("admin"), deleteOneMessage);
module.exports = router;
