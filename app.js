//to handle uncaughtException errors Basuoi
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.stack);
});
// express frame  work
const express = require("express");
const { appRouter } = require("./src/component/index.router");
const app = express();
const cors=require("cors");
app.use(cors());
// module dotenv to save the improtant data
require("dotenv").config({ path: "./config/.env" });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
appRouter(app)
//to handle unhandledRejection errors
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.stack);
});
   
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
