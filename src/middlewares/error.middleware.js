const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === "production";

  console.error("Error: ", err);

  let message = err.message;

  if (isProd && !err.isOperational) {
    message = "Something went wrong";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
