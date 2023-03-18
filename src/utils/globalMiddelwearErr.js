module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // if (err.message === "Unexpected field") err.message = "Error MaxCount 5 ";
  if (process.env.NODE_ENV === "development") {
    devMode(err, res);
  } else {
    prodMode(err, res);
  }
};
let devMode = (err, res) => {
  res.status(err.statusCode);
  res.json({
    status: err.statusCode,
    message: err.message,
    err,
    path: err.stack,
  });
};
let prodMode = (err, res) => {
  res.status(err.statusCode);
  res.json({
    status: err.statusCode,
    message: err.message,
  });
};
