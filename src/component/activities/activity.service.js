
const ActivityModel = require("./activity.model");
const refactor=require("../Handler/HandleRefactor")

// to creat Activity
module.exports.creatActivity =  refactor.createOne(ActivityModel,"activity");
// to get the All Activities {description and name} of youth Activity
exports.getActivities = refactor.getAll(ActivityModel);

// get specific Activity by id
exports.getٍSpcificActivity = refactor.getOne(ActivityModel);

// update the Activity {description and name} of youth Activity
exports.updateActivity = refactor.updateOne(ActivityModel)

// remove image frome Activity
exports.removeImageofromActivity = refactor.removeImage(ActivityModel);

// add image to Activity
exports.AddImageoToActivity = refactor.addImage(ActivityModel, "category");

// delete the Activity {description and name} of youth Activity
exports.deleteActivity = refactor.deleteOne(ActivityModel);