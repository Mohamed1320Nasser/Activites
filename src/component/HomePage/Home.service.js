const HomePageModel = require("./Home.model");
const refactor = require("../Handler/HandleRefactor");
// to get the Home {description and name} of Home
exports.getHomePage = refactor.getAll(HomePageModel);
// update the Home {description and name} of Home
exports.updateHomePage = refactor.updateOne(HomePageModel);

