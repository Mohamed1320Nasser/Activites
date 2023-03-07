const YouthWelfareModel = require("./YouthWelfare.model");
const refactor = require("../Handler/HandleRefactor");
// to creat a description and name of the youth Activity
module.exports.creatYouthWelfare = refactor.creatOne(
  YouthWelfareModel,
  "YouthWelfare"
);
// to get the YouthWelfare {description and name} of youth Activity
exports.getYouthWelfare = refactor.getAll(YouthWelfareModel);
// update the YouthWelfare {description and name} of youth Activity
exports.updateYouthWelfare = refactor.updateOne(YouthWelfareModel);

