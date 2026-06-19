const AppError = require('../utils/AppError');

const validate = (schemas) => (req, res, next) => {
  const targets = ['body', 'params', 'query'];
  
  for (const target of targets) {
    if (schemas[target]) {
      const result = schemas[target].safeParse(req[target]);

      if (!result.success) {
        const errorDetails = result.error.issues
          .map(err => {
            const fieldPath = err.path.length > 0 ? `.${err.path.join('.')}` : '';
            return `${target}${fieldPath}: ${err.message}`;
          })
          .join(', ');

        return next(new AppError(`Validation failed: ${errorDetails}`, 400));
      }

      req[target] = result.data;
    }
  }
  next();
};

module.exports = validate;
