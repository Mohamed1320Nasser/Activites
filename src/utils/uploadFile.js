const multer = require('multer');
const AppError = require("./AppError")
const cloudinary = require('cloudinary').v2;

let options = (folderName) => {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 400), true);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};
exports.uploadSingleImage = (fieldName, folderName) =>
  options(folderName).single(fieldName);

exports.fileMixUpload = (fieldArry, folderName) =>
  options(folderName).fields(fieldArry);
