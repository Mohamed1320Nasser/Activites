class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.err = "error";
  }
}
module.exports = AppError;
