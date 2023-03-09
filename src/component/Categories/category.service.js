const CategoryModel = require("./category.model");
const refactor = require("../Handler/HandleRefactor");

// to creat Category
module.exports.creatCategory = refactor.createOne(CategoryModel, "category");

// to get the All Categories {description and name} of youth Category
module.exports.getCategories = refactor.getAll(CategoryModel);

//to get specific category
exports.getٍSpcificCategory = refactor.getOne(CategoryModel);

// update the Category {description and name} of youth Category
exports.updateCategory = refactor.updateOne(CategoryModel, "category");

// remove image frome category
exports.removeImageofromCategory = refactor.removeImage(CategoryModel);

// add image to category
exports.AddImageoToCategory = refactor.addImage(CategoryModel, "category");

// delete the Category {description and name} of youth Category
exports.deleteCategory = refactor.deleteOne(CategoryModel);
