const { fileMixUpload, uploadSingleImage } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { CategoryValidation } = require("../validations/category.validat");
const {
  creatCategory,
  getٍSpcificCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  removeImageofromCategory,
  AddImageoToCategory,
} = require("./category.service");
const activities =require("../activities/activity.routes")
const router = require("express").Router();

    router.use("/:categoryId/activities",activities)

let fields = [
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 5 },
];
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    CategoryValidation,
    fileMixUpload(fields, "category"),
    creatCategory
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getٍSpcificCategory)
  .put(protectedRoutes, allowedTo("admin"), updateCategory)
  .delete(protectedRoutes, allowedTo("admin"), deleteCategory);
router
  .put("/removeimage/:id", removeImageofromCategory)
  .put(
    "/addimage/:id",
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "category"),
    AddImageoToCategory
  );

module.exports = router;
