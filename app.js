//to handle uncaughtException errors Basuoi
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.stack);
});
// express frame  work
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
// module dotenv to save the improtant data
require("dotenv").config({ path: "./config/.env" });

const port = process.env.PORT;
const { appRouter } = require("./src/component/index.router");
appRouter(app);
//to handle unhandledRejection errors
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.stack);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
