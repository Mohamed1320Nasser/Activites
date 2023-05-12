const HomePageModel = require("./Home.model");
const refactor = require("../Handler/HandleRefactor");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
// to get the Home {description and name} of Home
exports.getHomePage = refactor.getAll(HomePageModel);
// update the Home {description and name} of Home
exports.updateHomePage = refactor.updateOne(HomePageModel);
// add image to Activity
exports.AddImageoToHome = refactor.addImage(HomePageModel, "HomePage");
// remove image frome Activity
exports.removeImageofromHome = refactor.removeImage(HomePageModel);


