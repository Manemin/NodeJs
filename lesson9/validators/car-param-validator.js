const Joi = require('joi');

const { EMAIL } = require('../constants/regex');

module.exports = Joi.object({
    email: Joi.string().regex(EMAIL),
    id: Joi.number().integer().min(1),
    model: Joi.string().trim(),
    price: Joi.number().integer().min(1),
    year: Joi.string().trim(),
});
