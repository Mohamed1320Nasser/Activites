const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
  cloudinary,
} = require("../../utils/cludinary");

// creat Document
exports.createOne = (model, fieldName) => {
  return catchAsyncError(async (req, res, next) => {
    if (req.files) {
      const { coverImage, images } = req.files;
      //upload cover image
      const coverImageUlr = await uploadToCloudinary(coverImage[0], fieldName);
      req.body.coverImage = coverImageUlr.secure_url;
      req.body.cloudinary_id = coverImageUlr.public_id;

      const promises = [];
      for (let image of images) {
        const promise = uploadToCloudinary(image, fieldName);
        promises.push(promise);
      }
      try {
        const result = [];
        const imagesPromise = await Promise.allSettled(promises);
        imagesPromise.map((image) => {
          result.push({ url: image.value.secure_url, cloudinary_id: image.value.public_id });
        });
        req.body.images = result
      } catch (err) {
        result.map(async (image) => {
          await deleteFromCloudinary(image.cloudinary_id)
        })
        return next(new AppError(`Something went wrong ${err}`, 500));
      }
    } else {
      const { secure_url } = await uploadToCloudinary(req.file, fieldName);
      req.body.image = secure_url;
    }
    const document = new model(req.body);
    await document.save();
    return res.status(200).json(document);
  });
};
// get all Documents
exports.getAll = (model) => {
  return catchAsyncError(async (req, res, next) => {
    let filter = {};
    if (req.params.categoryId) {
      filter = { category: req.params.categoryId };
    }

    const lang = req.query.lang || "ar";
    const nameField = lang === "ar"
      ? "-title_en -description_en -goles_en -place_en -name_en"
      : "-title_ar -description_ar -goles_ar -place_ar -name_ar";
    const Document = await model
      .find(filter)
      .select(nameField).lean().sort({ _id: -1 })
    !Document && next(new AppError("Document not found", 404));
    Document && res.status(200).json({ result: Document });
  });
};
// get one Document
exports.getOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const lang = req.query.lang || "ar";
    const nameField = lang === "ar"
      ? "-title_en -description_en -goles_en -place_en -name_en"
      : "-title_ar -description_ar -goles_ar -place_ar -name_ar";
    const Document = await model
      .findById(id)
      .select(nameField);
    !Document && next(new AppError("Document not found", 404));
    Document && res.status(200).json({ result: Document });
  });
};
//update Document
exports.updateOne = (model, folder) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    if (req.file) {
      const Decument = await model.findById(id);
      await deleteFromCloudinary(Decument.cloudinary_id)
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
      });
      req.body.coverImage = result.secure_url;
      req.body.cloudinary_id = result.public_id;
    }
    const Decument = await model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !Decument && next(new AppError("Decument not found", 404));
    Decument && res.status(200).json({ result: Decument });
  });
};
// remove image from document
exports.removeImage = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    // const findDecument = model.findById(id)
    const cloudinary_id = req.body.cloudinary_id;
    await deleteFromCloudinary(cloudinary_id)
    const Document = await model.findByIdAndUpdate(
      id,
      { $pull: { images: { cloudinary_id: cloudinary_id } } },
      { new: true }
    );
    await Document.save();
    !Document && next(new AppError("Document not found", 404));
    Document && res.status(200).json({ result: Document });
  });
};

//add image to document
exports.addImage = (model, folder) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const result = await uploadToCloudinary(req.file, folder)
    if (!result) return next(new AppError("upload not succes", 404))
    const Document = await model.findByIdAndUpdate(
      id,
      {
        $push: {
          images: { url: result.secure_url, cloudinary_id: result.public_id },
        },
      },
      { new: true }
    );
    await Document.save();
    !Document && next(new AppError("Document not found", 404));
    Document && res.status(200).json({ message: "add image success" });
  });
};
//delete Document
exports.deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const Document = await model.findById(id);
    if (Document.coverImage) {
      await deleteFromCloudinary(Document);
    }
    if (Document.images.length !== 0) {
      const public_id = [];
      Document.images.forEach((image) => public_id.push(image.cloudinary_id));
      await cloudinary.api.delete_resources(public_id, (err, result) => {
        if (err) return next(new AppError(err, 400));
      });
    }
    await model.findByIdAndDelete(id, {
      new: true,
    });
    !Document && next(new AppError("Document not found", 404));
    Document && res.status(200).json("deleted");
  });
};
