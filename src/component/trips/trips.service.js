const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const TripModel = require("./trips.model");
const refactor=require("../Handler/HandleRefactor")

// to creat Trip
module.exports.creatTrip = refactor.creatOne(TripModel,"trips");

// to get the All Trips {description and name} of youth Trip
exports.getTrips = refactor.getAll(TripModel);

exports.getٍSpcificTrip = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.query);
  if (req.query.lang == "en") {
    const Trip = await TripModel.findById(id).select(
      "-title_ar -description_ar -place_ar"
    );
    !Trip && next(new AppError("not found ", 404));
    Trip && res.status(200).json({ result: Trip });
  } else {
    const Trip = await TripModel.findById(id).select(
      "-title_en -description_ar -place_en"
    );
    !Trip && next(new AppError("غير موجود", 404));
    Trip && res.status(200).json({ result: Trip });
  }
});
// update the Trip {description and name} of youth Trip
exports.updateTrip = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const Trip = await TripModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !Trip && next(new AppError("Trip not found", 404));
  Trip && res.status(200).json({ result: Trip });
});
// delete the Trip {description and name} of youth Trip
exports.deleteTrip = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const Trip = await TripModel.findByIdAndDelete(id, {
    new: true,
  });
  !Trip && next(new AppError("Trip not found", 404));
  Trip && res.status(200).json("deleted");
});
