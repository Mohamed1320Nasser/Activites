const AppError = require("./AppError");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
exports.cloudinary = cloudinary;

exports.uploadToCloudinary = async (file, fieldName) => {
  try {
    console.log(file);
    if (file.size > 3000000) {
      throw "File size should be less than 3Mb";
    }
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `Youth Welfare/${fieldName}`,
      resource_type: "image",
    });
    return result;
  } catch (err) {
    throw new AppError(err,401)
  }
};
exports.deleteFromCloudinary = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};