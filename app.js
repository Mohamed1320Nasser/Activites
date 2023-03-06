//to handle uncaughtException errors
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.stack);
});
// express frame  work
const express = require("express");
const app = express();

require("dotenv").config({ path: "./config/.env" });
// dateBase connection
const { dbConnection } = require("./src/dataBase/dbConnection");
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//require globalMiddelWearErr
const globalMiddelwearErr = require("./src/utils/globalMiddelwearErr");

// to determine is development mode or production mode
let morgan = require("morgan");
const AppError = require("./src/utils/AppError");
const userModel = require("./src/component/user/user.model");
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}

// module dotenv to save the improtant data
const port = process.env.PORT;
// routes
app.use(
  "/youthActivities",
  require("./src/component/YouthWelfare/YouthWelfare.routes")
);
app.use("/activities", require("./src/component/activities/activity.routes"));
app.use("/categories", require("./src/component/Categories/category.routes"));
app.use("/users", require("./src/component/user/user.routes"));
app.use("/trips", require("./src/component/trips/trips.routes"));
app.use("/enroll", require("./src/component/enroll/enroll.routes"));
app.use("/sendEmail", require("./src/component/emails/email.routes"));

// end point to tell us wrong path
app.all("*", (req, res, next) => {
  next(new AppError(`cannot get this route ${req.originalUrl} in her `, 404));
});
//global Error handling middleware
app.use(globalMiddelwearErr);

//to handle unhandledRejection errors
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.stack);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
