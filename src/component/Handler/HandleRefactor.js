
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { cloudinary } = require("../../utils/cludinary");


// creat Document
exports.creatOne = (model, filedName) => {
  return catchAsyncError(async (req, res, next) => {
    if (req.files) {

      const result = await cloudinary.uploader.upload(
        req.files.coverImage[0].path,
        { folder: filedName }
      );
    
      req.body.coverImage = result.secure_url;
      req.body.cloudinary_id = result.public_id;
      let imgs = [];
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: filedName,
        });
        imgs.push({ url: result.secure_url, cloudinary_id: result.public_id });
      }
      req.body.images = imgs;
      console.log(imgs);
    } else {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: filedName,
      });
      req.body.image = secure_url;
    }
    const document = new model(req.body);
    await document.save();
    res.status(200).json(document);
  });
};

// get all Documents
exports.getAll = (model) => {
  return catchAsyncError(async (req, res, next) => {
    if (req.query.lang == "en") {
      const Document = await model
        .find({})
        .select("-title_ar -description_ar -goles_ar -place_ar");
      !Document && next(new AppError("Document not found", 404));
      Document && res.status(200).json({ result: Document });
    } else {
      const Document = await model
        .find({})
        .select("-title_en -description_en -goles_en -place_en");
      !Document && next(new AppError("غير موجود", 404));
      Document && res.status(200).json({ result: Document });
    }
  });
};

// get one Document
exports.getOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    if (req.query.lang == "en") {
      const Decument = await model
        .findById(id)
        .select("-title_ar -description_ar -goles_ar -place_ar");
      !Decument && next(new AppError("not found ", 404));
      Decument && res.status(200).json({ result: Decument });
    } else {
      const Decument = await model
        .findById(id)
        .select("-title_en -description_en -goles_en -place_en");
      !Decument && next(new AppError("غير موجود", 404));
      Decument && res.status(200).json({ result: Decument });
    }
  });
};

//update Document
exports.updateOne = (model, folder) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    if (req.file) {
      const Decument = await model.findById(id);
      await cloudinary.uploader.destroy(Decument.cloudinary_id);
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
    const cloudinary_id = req.body.cloudinary_id;

    await cloudinary.uploader.destroy(cloudinary_id);
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
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folder,
    });
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
    Document && res.status(200).json({ result: Document });
  });
};

//delete Document
exports.deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const Document = await model.findById(id);
    await cloudinary.uploader.destroy(Document.cloudinary_id);
    if (Document.images) {
      const public_id = [];
      Document.images.forEach((image) => public_id.push(image.cloudinary_id));
      await cloudinary.api.delete_resources(public_id, (err, result) => {
        if (err) {
          new AppError(err, 400);
        }
      });
    }
    await model.findByIdAndDelete(id, {
      new: true,
    });
    !Document && next(new AppError("Document not found", 404));
    Document && res.status(200).json("deleted");
  });
};
