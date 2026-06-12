/**
 * Wraps an async Express route handler and forwards any rejected
 * promises/errors to Express error middleware via next().
 *
 * Useful in Express 4 where async errors are not automatically caught.
 *
 * Example:
 * router.get("/", asyncHandler(async (req, res) => {
 *   const data = await service.getData();
 *   res.json(data);
 * }));
 *
 * Without this wrapper, you'd need try/catch in every async controller.
 *
 * Note:
 * Express 5 automatically forwards async errors, so this helper is
 * generally unnecessary when using Express 5.
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;