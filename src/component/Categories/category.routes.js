const {  fileMixUpload, uploadSingleImage } = require("../../utils/uploadFile");
const {
  creatCategory,
  getٍSpcificCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  removeImageofromCategory,
  AddImageoToCategory,
} = require("./category.service");

const router = require("express").Router();
let fields=[{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 5 }]
router.route("/").post(fileMixUpload(fields,"category"),creatCategory).get(getCategories);
router
  .route("/:id")
  .get(getٍSpcificCategory)
  .put(updateCategory)
  .delete(deleteCategory)
   router.put("/removeimage/:id",removeImageofromCategory) .put("/addimage/:id",uploadSingleImage("image","category"),AddImageoToCategory)

module.exports = router;
