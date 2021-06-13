const Joi = require('joi');
const errors = require('../helpers/error');
const { logger } = require('../helpers/logger');

module.exports = {
  getTrailer: (req, res, next) => {
    const schema = Joi.object({
      movieUrl: Joi.string()
        .uri()
        .required(),
    });
    const { error } = schema.validate(req.query);
    if (error) {
      logger.error({ uri: null, message: error, statusCode: 400 });
      errors.create({ message: error, statusCode: 400 }, next);
    } else {
      next();
    }
  },
};
