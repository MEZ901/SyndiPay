import CustomError from "../../exceptions/CustomError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (!(err instanceof CustomError)) {
    res.status(500).json({
      message: "Server error, please try again later",
    });
  } else {
    const customError = err;
    const response = {
      message: customError.message,
      ...(customError.additionalInfo && {
        additionalInfo: customError.additionalInfo,
      }),
    };
    res.status(customError.status).json(response);
  }
};

export default errorHandler;
