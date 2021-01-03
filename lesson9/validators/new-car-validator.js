const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string().trim().required(),
    price: Joi.number().integer().min(1).required(),
    year: Joi.string().trim().required(),
    user_id: Joi.number().integer(),
});
