import Joi from 'joi';

const boom = {
  message: Joi.string().required(),
  statusCode: Joi.number().integer().greater(400),
  error: Joi.string().required(),
  attributes: Joi.object()
};

module.exports = boom;