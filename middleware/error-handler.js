const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);

  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "Something went wrong",
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.name === "ValidationError") {
    (CustomError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",")),
      (CustomError.statusCode = StatusCodes.BAD_REQUEST);
  }
  if(err.name === 'CastError'){
    (CustomError.msg = "No item found with your ID"),
      (CustomError.statusCode = StatusCodes.BAD_REQUEST);
  }
  // console.log(Object.values(err.errors));
  if (err.code && err.code === 11000) {
    (CustomError.msg = "Email already in use"),
      (CustomError.statusCode = StatusCodes.BAD_REQUEST);
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(CustomError.statusCode).json({ msg: CustomError.msg });
};

module.exports = errorHandlerMiddleware;
