const createError = require('http-errors');

module.exports = {
  create: (err, next) => {
    let defMsg; let
      defCode;
    if (!err || !('message' in err) || !('statusCode' in err)) {
      defMsg = 'INTERNAL SERVER ERROR';
      defCode = 500;
    }
    defMsg = err.message;
    defCode = err.statusCode;
    next(createError(defCode, defMsg));
  },
};
