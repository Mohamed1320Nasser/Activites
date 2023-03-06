const { sendNotification } = require("./notification.emai");

const router = require("express").Router();

   router.get("/",sendNotification)




module.exports = router;