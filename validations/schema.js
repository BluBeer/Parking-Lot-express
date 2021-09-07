const Joi = require('joi');

const schemas = {
  vehicleType: Joi.object().keys({
    type: Joi.string().valid('car', 'truck', 'bike').required(),
  }),
  floorType: Joi.object().keys({
    floorNumber: Joi.number().integer().min(0).max(5)
      .required(),
  }),
};
module.exports = schemas;
