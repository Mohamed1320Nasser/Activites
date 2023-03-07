const multer = require('multer');
const AppError = require("./AppError")
const mimeTypes= require("mime-types")


let options = (folderName) => {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
   const fileMimeType = mimeTypes.lookup(file.originalname);
    if (allowedMimeTypes.includes(fileMimeType) )  {
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
