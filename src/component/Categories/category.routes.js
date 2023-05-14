const { fileMixUpload, uploadSingleImage, checkImageUpload } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../student/student.auth");
const { CategoryValidation, CategoySchema } = require("./category.validat");
const {
  creatCategory,
  getٍSpcificCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  removeImageofromCategory,
  AddImageoToCategory,
} = require("./category.service");
const activities = require("../activities/activity.routes");
const { validation } = require("../../utils/validation.meddle");
const router = require("express").Router();

router.use("/:categoryId/activities", activities)

let fields = [
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 5 },
];
router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    fileMixUpload(fields, "category"),
    validation(CategoySchema),
    creatCategory
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getٍSpcificCategory)
  .put(protectedRoutes, allowedTo("admin"),validation(CategoySchema), updateCategory)
  .delete(protectedRoutes, allowedTo("admin"), deleteCategory);
router
  .post("/removeimage/:id", protectedRoutes,
    allowedTo("admin"), removeImageofromCategory)
  .post(
    "/addimage/:id",
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleImage("image", "category"),
    checkImageUpload,
    AddImageoToCategory
  );

module.exports = router;
